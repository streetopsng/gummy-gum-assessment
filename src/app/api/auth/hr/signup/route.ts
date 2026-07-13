import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password, orgName } = await req.json();

    if (!name || !email || !password || !orgName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create Organization and HR User in a transaction
    const result = await prisma.$transaction(async (tx: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
      const org = await tx.organization.create({
        data: { name: orgName }
      });

      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: "HR",
          organizationId: org.id
        }
      });

      return { org, user };
    });

    // Generate JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_for_dev_only");
    const jwt = await new SignJWT({ 
      userId: result.user.id, 
      email: result.user.email,
      role: result.user.role,
      organizationId: result.org.id
    })
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
