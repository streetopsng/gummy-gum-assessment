import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PERSONAS } from "../../../../data/personas";
import { Meters } from "../../../../data/types";
import { CARDS } from "../../../../data/cards";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();

const getQualityPoints = (quality: string) => {
  switch (quality) {
    case "Best": return 2;
    case "Good": return 1;
    case "Weak": return 0;
    case "Poor": return -2;
    default: return 0;
  }
};

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_for_dev_only");
    const { payload } = await jwtVerify(token, secret);
    
    if (payload.role !== "HR" || !payload.organizationId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      where: { 
        organizationId: payload.organizationId as string,
        role: "CANDIDATE" 
      },
      include: {
        sessions: {
          orderBy: { startedAt: "desc" },
          take: 1,
          include: { meters: true, responses: true }
        }
      }
    });

    let totalSessions = 0;
    let totalCompleted = 0;
    
    // Calculate max possible points for overall alignment score
    let totalMaxPoints = 0;
    CARDS.forEach((card: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
      let maxPoints = -2;
      card.options.forEach((opt: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
        const pts = getQualityPoints(opt.quality);
        if (pts > maxPoints) maxPoints = pts;
      });
      totalMaxPoints += maxPoints;
    });
    
    const candidates = users.map((user: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
      const session = user.sessions[0];
      if (!session) return null;
      
      totalSessions++;
      
      const isCompleted = session.responses.length >= 30;
      if (isCompleted) totalCompleted++;

      let persona = null;
      if (isCompleted && session.meters) {
        const m = session.meters;
        const meters: Meters = { rep: m.rep, inf: m.inf, gro: m.gro, imp: m.imp };
        const order = ["rep", "inf", "gro", "imp"] as (keyof Meters)[];
        const sorted = [...order].sort((a, b) => meters[b] - meters[a]);
        const top2 = [sorted[0], sorted[1]].sort();
        const key = top2.join(",");
        persona = PERSONAS[key] || PERSONAS["rep,imp"];
      }

      // Calculate candidate alignment score
      let candidatePoints = 0;
      session.responses.forEach((response: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
        const matchedCard = CARDS.find((c: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => `card_${c.num}` === response.cardId);
        if (matchedCard) {
          const matchedOption = matchedCard.options.find((o: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => o.label === response.selectedOption);
          if (matchedOption) {
            candidatePoints += getQualityPoints(matchedOption.quality);
          }
        }
      });
      const alignmentScore = totalMaxPoints > 0 ? Math.max(0, Math.round((candidatePoints / totalMaxPoints) * 100)) : 0;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        status: isCompleted ? "Completed" : "In Progress",
        progress: session.responses.length,
        persona: persona ? persona.name : "-",
        alignmentScore,
        lastActive: session.updatedAt || session.startedAt
      };
    }).filter(Boolean);

    // Sort by most recently active
    candidates.sort((a, b) => new Date(b!.lastActive).getTime() - new Date(a!.lastActive).getTime());

    const attendanceRate = totalSessions > 0 ? Math.round((totalCompleted / totalSessions) * 100) : 0;

    return NextResponse.json({
      metrics: {
        totalSessions,
        totalParticipants: users.length,
        attendanceRate,
        avgEngagement: 8.4 // Mock metric to match the UI vibe
      },
      candidates
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
