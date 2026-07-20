import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { CARDS } from "../../../../data/cards";

export async function POST(req: Request) {
  try {
    const { name } = await req.json().catch(() => ({ name: "Anonymous" }));

    const user = await prisma.user.create({
      data: {
        name: name || "Anonymous",
        role: "CANDIDATE"
      }
    });

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        meters: {
          create: { rep: 0, inf: 0, gro: 0, imp: 0 }
        }
      }
    });

    const firstCard = CARDS[0];
    const sanitizedCard = {
      ...firstCard,
      options: firstCard.options.map((opt: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
        label: opt.label,
        text: opt.text
      }))
    };

    const response = NextResponse.json({ 
      session_id: session.id, 
      card: sanitizedCard,
      totalCards: CARDS.length 
    });

    response.cookies.set("session_id", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to start simulation" }, { status: 500 });
  }
}
