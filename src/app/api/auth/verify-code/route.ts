import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { SignJWT } from "jose";



export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    // Find the latest valid code for this email
    const verification = await prisma.verificationCode.findFirst({
      where: {
        email: email,
        code: code,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!verification) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
    }

    // Code is valid. Find or create the user.
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email, name: verification.name } });
    }

    // Generate JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_for_dev_only");
    const jwt = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // Clean up used code
    await prisma.verificationCode.deleteMany({ where: { email } });

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
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 });
  }
}
