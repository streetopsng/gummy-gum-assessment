import { NextResponse } from "next/server";
import prisma from "@/lib/db";



export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    // Save to DB
    await prisma.verificationCode.create({
      data: {
        email,
        name,
        code,
        expiresAt
      }
    });

    // In local dev, we log to console.
    console.log(`\n\n[DEV MOCK EMAIL]`);
    console.log(`To: ${email}`);
    console.log(`Subject: Your NovaCore Assessment Code`);
    console.log(`Code: ${code}\n\n`);

    return NextResponse.json({ success: true, message: "Code sent" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send code" }, { status: 500 });
  }
}
