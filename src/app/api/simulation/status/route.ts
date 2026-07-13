import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { CARDS } from "../../../../data/cards";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ status: "unauthenticated" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_for_dev_only");
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        sessions: {
          orderBy: { startedAt: 'desc' },
          take: 1,
          include: { meters: true }
        }
      }
    });

    if (!user) return NextResponse.json({ status: "unauthenticated" }, { status: 401 });

    const activeSession = user.sessions[0];

    if (!activeSession) {
      return NextResponse.json({ status: "new", user: { name: user.name } });
    }

    if (activeSession.completedAt) {
      return NextResponse.json({ status: "completed", sessionId: activeSession.id });
    }

    // Returning active session state
    const currentCardRaw = CARDS[activeSession.currentCardIndex];
    const sanitizedCard = {
      ...currentCardRaw,
      options: currentCardRaw.options.map(opt => ({
        label: opt.label,
        text: opt.text
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
