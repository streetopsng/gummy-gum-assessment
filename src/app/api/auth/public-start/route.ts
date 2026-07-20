import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Create new candidate
      user = await prisma.user.create({
        data: {
          name,
          email,
          role: "CANDIDATE"
        }
      });
    }

    // Generate JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_for_dev_only");
    const jwt = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // Set cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("auth_token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
