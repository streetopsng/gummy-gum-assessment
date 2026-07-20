import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { CARDS } from "../../../../data/cards";



const getQualityPoints = (quality: string) => {
  switch (quality) {
    case "Best": return 2;
    case "Good": return 1;
    case "Weak": return 0;
    case "Poor": return -2;
    default: return 0;
  }
};

export async function POST(req: Request) {
  try {
    const { session_id, option_label } = await req.json();

    const session = await prisma.session.findUnique({
      where: { id: session_id },
      include: { meters: true }
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const cardIndex = session.currentCardIndex;
    if (cardIndex >= CARDS.length) {
      return NextResponse.json({ error: "Simulation already completed" }, { status: 400 });
    }

    const currentCard = CARDS[cardIndex];
    const selectedOption = currentCard.options.find(opt => opt.label === option_label);

    if (!selectedOption) {
      return NextResponse.json({ error: "Invalid option" }, { status: 400 });
    }

    // 1. Record Response
    await prisma.response.create({
      data: {
        sessionId: session.id,
        cardId: `card_${currentCard.num}`,
        selectedOption: option_label
      }
    });

    // 2. Update Meters
    const m = selectedOption.meters;
    await prisma.meter.update({
      where: { sessionId: session.id },
      data: {
        rep: { increment: m.rep || 0 },
        inf: { increment: m.inf || 0 },
        gro: { increment: m.gro || 0 },
        imp: { increment: m.imp || 0 }
      }
    });

    // 3. Log Skill
    await prisma.skillLog.create({
      data: {
        sessionId: session.id,
        skill: selectedOption.skill,
        quality: selectedOption.quality,
        points: getQualityPoints(selectedOption.quality)
      }
    });

    // 4. Increment Card Index
    const newIndex = cardIndex + 1;
    await prisma.session.update({
      where: { id: session.id },
      data: { 
        currentCardIndex: newIndex,
        completedAt: newIndex >= CARDS.length ? new Date() : null
      }
    });

    // 5. Generate Response Data
    const lines = [
      "Noted. The day moves on.",
      "It works. Ninety days is a long story — this is one line in it.",
      "That's your call. Life at NovaCore continues.",
      "Alright. Onward.",
    ];
    const reactionText = lines[Math.floor(Math.random() * lines.length)];

    let nextCard = null;
    if (newIndex < CARDS.length) {
      const nextRaw = CARDS[newIndex];
      nextCard = {
        ...nextRaw,
        options: nextRaw.options.map(o => ({ label: o.label, text: o.text }))
      };
    }

    const updatedMeters = await prisma.meter.findUnique({ where: { sessionId: session.id } });

    return NextResponse.json({
      reaction: reactionText,
      nextCard: nextCard,
      meters: updatedMeters,
      completed: newIndex >= CARDS.length
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process answer" }, { status: 500 });
  }
}
