import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { CARDS } from "../../../../data/cards";

export async function GET(req: Request /* eslint-disable-line @typescript-eslint/no-unused-vars */) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;
    if (!sessionId) return NextResponse.json({ status: "unauthenticated" }, { status: 401 });

    const activeSession = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        meters: true,
        user: true
      }
    });

    if (!activeSession) return NextResponse.json({ status: "unauthenticated" }, { status: 401 });

    if (activeSession.completedAt) {
      return NextResponse.json({ status: "completed", sessionId: activeSession.id });
    }

    const currentCardRaw = CARDS[activeSession.currentCardIndex];
    const sanitizedCard = {
      ...currentCardRaw,
      options: currentCardRaw.options.map((opt: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
        label: opt.label,
        text: opt.text,
        reaction: opt.reaction
      }))
    };

    return NextResponse.json({
      status: "active",
      sessionId: activeSession.id,
      card: sanitizedCard,
      totalCards: CARDS.length,
      meters: activeSession.meters
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "unauthenticated" }, { status: 401 });
  }
}
