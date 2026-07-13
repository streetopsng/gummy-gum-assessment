import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const tokenCookie = req.cookies.get("auth_token")?.value;
    if (!tokenCookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_for_dev_only");
    const { payload } = await jwtVerify(tokenCookie, secret);
    
    if (payload.role !== "HR" || !payload.organizationId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const orgId = payload.organizationId as string;
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Generate a unique token
    const token = crypto.randomBytes(16).toString("hex");

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "A candidate with this email already exists." }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        organizationId: orgId,
        inviteToken: token,
      }
    });

    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/invite?token=${token}`;

    return NextResponse.json({ magicLink, user });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
