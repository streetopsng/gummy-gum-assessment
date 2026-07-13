"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Meters, SkillLogEntry, Card } from "../data/types";
import { IntroScreen } from "../components/IntroScreen";
import { TopBar } from "../components/TopBar";
import { GameScreen } from "../components/GameScreen";
import { ResultsScreen } from "../components/ResultsScreen";

export default function Home() {
  const router = useRouter();
  const [gameState, setGameState] = useState<"loading" | "intro" | "game" | "results">("loading");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Backend State
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [totalCards, setTotalCards] = useState(30);
  const [meters, setMeters] = useState<Meters>({ rep: 0, inf: 0, gro: 0, imp: 0 });
  const [skillLog, setSkillLog] = useState<SkillLogEntry[]>([]);
  const [persona, setPersona] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const triggerTransition = (nextState: "intro" | "game" | "results") => {
    setIsTransitioning(true);
    setTimeout(() => {
      setGameState(nextState);
      setIsTransitioning(false);
    }, 400);
  };

  useEffect(() => {
    // Check session status on load
    fetch("/api/simulation/status")
      .then(res => {
        if (!res.ok) throw new Error("Unauthenticated");
        return res.json();
      })
      .then(async data => {
        if (data.status === "new") {
          setGameState("intro");
        } else if (data.status === "active") {
          setSessionId(data.sessionId);
          setCurrentCard(data.card);
          setTotalCards(data.totalCards);
          setMeters(data.meters || { rep: 0, inf: 0, gro: 0, imp: 0 });
          setGameState("game");
        } else if (data.status === "completed") {
          setSessionId(data.sessionId);
          const res = await fetch(`/api/simulation/results?session_id=${data.sessionId}`);
          const results = await res.json();
          setMeters(results.meters);
          setSkillLog(results.skillLog);
          setPersona(results.persona);
          setGameState("results");
        }
      })
      .catch(() => {
        router.push("/auth");
      });
  }, [router]);

  const handleStart = async () => {
    try {
      const res = await fetch("/api/simulation/start", { method: "POST" });
      const data = await res.json();
      setSessionId(data.session_id);
      setCurrentCard(data.card);
      setTotalCards(data.totalCards);
      setMeters({ rep: 0, inf: 0, gro: 0, imp: 0 });
      setSkillLog([]);
      triggerTransition("game");
    } catch (e) {
      console.error(e);
      alert("Failed to start simulation. Is the backend running?");
    }
  };

  const handleOptionSelect = async (optionLabel: string) => {
    const res = await fetch("/api/simulation/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, option_label: optionLabel })
    });
    return await res.json();
  };

  const handleContinue = async (nextStateData: { meters?: Meters; completed?: boolean; nextCard?: Card }) => {
    if (!nextStateData) return;

    if (nextStateData.meters) {
      setMeters(nextStateData.meters);
    }

    if (nextStateData.completed) {
      // Fetch final results
      const res = await fetch(`/api/simulation/results?session_id=${sessionId}`);
      const data = await res.json();
      setMeters(data.meters);
      setSkillLog(data.skillLog);
      setPersona(data.persona);
      triggerTransition("results");
    } else if (nextStateData.nextCard) {
      setCurrentCard(nextStateData.nextCard);
    }
  };

  const handleRestart = () => {
    triggerTransition("intro");
    setTimeout(() => {
      setSessionId(null);
      setCurrentCard(null);
      setMeters({ rep: 0, inf: 0, gro: 0, imp: 0 });
      setSkillLog([]);
      setPersona(null);
    }, 400);
  };

  return (
    <div className="w-full flex-grow min-h-screen bg-slate-50 overflow-y-auto overflow-x-hidden relative flex flex-col transition-all duration-500">
      <div className={`flex-grow flex flex-col transition-all duration-400 ease-in-out ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
        
        {gameState === "loading" && (
          <div className="flex-grow flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-brand-purple border-t-transparent animate-spin"></div>
          </div>
        )}

        {gameState === "intro" && <IntroScreen onStart={handleStart} />}
        
        {gameState === "game" && currentCard && (
          <div className="flex-grow flex flex-col">
            <TopBar 
              meters={meters} 
              progressPercent={((currentCard.num - 1) / totalCards) * 100} 
            />
            <GameScreen
              card={currentCard}
              totalCards={totalCards}
              onOptionSelect={handleOptionSelect}
              onContinue={handleContinue}
            />
          </div>
        )}

        {gameState === "results" && persona && (
          <ResultsScreen
            meters={meters}
            skillLog={skillLog}
            onRestart={handleRestart}
            personaOverride={persona}
          />
        )}
      </div>
    </div>
  );
}
