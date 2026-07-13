import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CARDS } from "../../../../../data/cards";
import { PERSONAS } from "../../../../../data/personas";
import { Meters } from "../../../../../data/types";
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_for_dev_only");
    const { payload } = await jwtVerify(token, secret);
    
    if (payload.role !== "HR" || !payload.organizationId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { userId } = await params;

    const user = await prisma.user.findUnique({
      where: { 
        id: userId,
        organizationId: payload.organizationId as string
      },
      include: {
        sessions: {
          orderBy: { startedAt: "desc" },
          take: 1,
          include: {
            responses: {
              orderBy: { timestamp: "asc" }
            },
            skillLogs: true,
            meters: true
          }
        }
      }
    });

    if (!user || user.sessions.length === 0) {
      return NextResponse.json({ error: "Candidate or session not found" }, { status: 404 });
    }

    const session = user.sessions[0];
    const isCompleted = session.responses.length >= 30;

    let persona = null;
    let metersRaw: Meters = { rep: 0, inf: 0, gro: 0, imp: 0 };
    if (session.meters) {
      metersRaw = { 
        rep: session.meters.rep, 
        inf: session.meters.inf, 
        gro: session.meters.gro, 
        imp: session.meters.imp 
      };
      if (isCompleted) {
        const order = ["rep", "inf", "gro", "imp"] as (keyof Meters)[];
        const sorted = [...order].sort((a, b) => metersRaw[b] - metersRaw[a]);
        const top2 = [sorted[0], sorted[1]].sort();
        const key = top2.join(",");
        persona = PERSONAS[key] || PERSONAS["rep,imp"];
      }
    }

    // Calculate max possible points per Act
    const maxPointsPerAct: Record<string, number> = {};
    let totalMaxPoints = 0;
    CARDS.forEach((card: any) => {
      const act = card.act;
      if (!maxPointsPerAct[act]) maxPointsPerAct[act] = 0;
      
      let maxPoints = -2;
      card.options.forEach((opt: any) => {
        const pts = getQualityPoints(opt.quality);
        if (pts > maxPoints) maxPoints = pts;
      });
      maxPointsPerAct[act] += maxPoints;
      totalMaxPoints += maxPoints;
    });

    const candidatePointsPerAct: Record<string, number> = {};
    Object.keys(maxPointsPerAct).forEach(act => candidatePointsPerAct[act] = 0);
    let totalCandidatePoints = 0;

    // Map responses to include card details
    const timeline = session.responses.map((response: any) => {
      // Find the card from the static data
      let matchedCard = null;
      let matchedOption = null;

      matchedCard = CARDS.find((c: any) => `card_${c.num}` === response.cardId) || null;
      if (matchedCard) {
        matchedOption = matchedCard.options.find((o: any) => o.label === response.selectedOption) || null;
        if (matchedOption) {
          const pts = getQualityPoints(matchedOption.quality);
          candidatePointsPerAct[matchedCard.act] += pts;
          totalCandidatePoints += pts;
        }
      }

      // Also attach related skill logs for this card
      // Since skillLog doesn't have cardId directly, we just know they were generated sequentially. 
      // Actually, skillLogs don't map perfectly to cardId in the DB. We'll just list them separately.
      
      return {
        id: response.id,
        timestamp: response.timestamp,
        cardId: response.cardId,
        act: matchedCard ? matchedCard.act : "?",
        sceneNum: matchedCard ? matchedCard.num : "?",
        title: matchedCard ? matchedCard.title : "Unknown Scenario",
        question: matchedCard ? matchedCard.connector : "",
        selectedLabel: response.selectedOption,
        selectedText: matchedOption ? matchedOption.text : "Unknown Option"
      };
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: isCompleted ? "Completed" : "In Progress",
        progress: session.responses.length,
        persona: persona ? persona.name : "Evaluating",
        personaDesc: persona ? persona.desc : null,
        alignmentScore: totalMaxPoints > 0 ? Math.max(0, Math.round((totalCandidatePoints / totalMaxPoints) * 100)) : 0
      },
      scoreBreakdown: {
        maxPointsPerAct,
        candidatePointsPerAct
      },
      meters: metersRaw,
      skillLogs: session.skillLogs,
      timeline
    });

  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Internal Server Error" }, { status: 500 });
  }
}
