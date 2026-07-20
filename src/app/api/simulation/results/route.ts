import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { PERSONAS } from "../../../../data/personas";
import { Persona } from "../../../../data/types";



export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");

    if (!session_id) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    const session = await prisma.session.findUnique({
      where: { id: session_id },
      include: { meters: true, skillLogs: true }
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const meters = session.meters;
    
    // Calculate Persona
    const meterValues = [
      { name: "rep", value: meters?.rep || 0 },
      { name: "inf", value: meters?.inf || 0 },
      { name: "gro", value: meters?.gro || 0 },
      { name: "imp", value: meters?.imp || 0 },
    ];
    
    // Sort descending
    meterValues.sort((a, b) => b.value - a.value);
    
    const top1 = meterValues[0].name;
    const top2 = meterValues[1].name;
    
    // Find matching persona
    let persona: Persona = {
      name: "The Enigma",
      desc: "A balanced profile defying typical categorization."
    };

    for (const key in PERSONAS) {
      if (key.includes(top1) && key.includes(top2)) {
        persona = PERSONAS[key as keyof typeof PERSONAS];
        break;
      }
    }

    return NextResponse.json({
      meters: meters,
      skillLog: session.skillLogs,
      persona: persona
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
