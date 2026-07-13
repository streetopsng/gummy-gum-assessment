import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { CARDS } from "../../../../data/cards";

const prisma = new PrismaClient();

export async function POST(req: Request /* eslint-disable-line @typescript-eslint/no-unused-vars */) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_for_dev_only");
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;

    // Create a new Session
    const session = await prisma.session.create({
      data: {
        userId: userId,
        meters: {
          create: { rep: 0, inf: 0, gro: 0, imp: 0 }
        }
      }
    });

    // 3. Return the first card WITHOUT points/skill info
    const firstCard = CARDS[0];
    const sanitizedCard = {
      ...firstCard,
      options: firstCard.options.map(opt => ({
        label: opt.label,
        text: opt.text
      }))
    };

    return NextResponse.json({ 
      session_id: session.id, 
      card: sanitizedCard,
      totalCards: CARDS.length 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to start simulation" }, { status: 500 });
  }
}
