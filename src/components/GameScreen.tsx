import { useState, useEffect } from "react";
import { Card, Option } from "../data/types";

type GameScreenProps = {
  card: Card;
  totalCards: number;
  onOptionSelect: (optionLabel: string) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onContinue: (nextStateData: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export function GameScreen({
  card,
  totalCards,
  onOptionSelect,
  onContinue,
}: GameScreenProps) {
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [stage, setStage] = useState<"decision" | "reaction" | "transition">("decision");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [nextGameStateData, setNextGameStateData] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswered(false);
    setSelectedOption(null);
    setStage("decision");
    setIsProcessing(false);
    setIsAnimatingOut(false);
    setHoveredOption(null);
    setNextGameStateData(null);
    setIsWaitingForNext(false);
  }, [card.num]);

  const [isWaitingForNext, setIsWaitingForNext] = useState(false);

  useEffect(() => {
    if (isWaitingForNext && nextGameStateData) {
      setIsProcessing(false);
      setIsAnimatingOut(true);
      setTimeout(() => onContinue(nextGameStateData), 400);
    }
  }, [isWaitingForNext, nextGameStateData, onContinue]);

  const handleSelect = (option: Option) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(option);
    
    // Optimistically go to reaction screen immediately
    setStage("reaction");

    // Fire network request in the background
    onOptionSelect(option.label).then((response) => {
      setNextGameStateData(response);
    }).catch(() => {
      alert("Network error. Please try again.");
      setAnswered(false);
      setSelectedOption(null);
      setStage("decision");
    });
  };

  const handleReactionContinue = () => {
    if (card.transition && (!nextGameStateData || !nextGameStateData.completed)) {
      setStage("transition");
    } else {
      proceedToNext();
    }
  };

  const handleTransitionContinue = () => {
    proceedToNext();
  };

  const proceedToNext = () => {
    if (!nextGameStateData) {
      setIsProcessing(true); // Show loader if network hasn't finished
      setIsWaitingForNext(true);
      return;
    }
    
    setIsAnimatingOut(true);
    setTimeout(() => {
      onContinue(nextGameStateData);
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage !== "decision" || answered || isProcessing) return;
      
      const key = e.key.toLowerCase();
      let index = -1;
      if (key === '1' || key === 'a') index = 0;
      else if (key === '2' || key === 'b') index = 1;
      else if (key === '3' || key === 'c') index = 2;
      else if (key === '4' || key === 'd') index = 3;

      if (index >= 0 && index < card.options.length) {
        handleSelect(card.options[index]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, answered, isProcessing, card.options]);

  if (stage === "reaction" && selectedOption) {
    return (
      <div className={`flex-grow flex items-center justify-center p-8 bg-slate-50 relative overflow-hidden transition-all duration-400 ease-in-out ${isAnimatingOut ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
        <div className="max-w-[640px] w-full text-center animate-slide-in-up">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-brand-purple mb-6">
            ● What Happens
          </span>
          <p className="font-display text-[24px] md:text-[28px] font-medium text-slate-900 leading-relaxed whitespace-pre-line mb-8">
            {selectedOption.reaction}
          </p>
          <button 
            onClick={handleReactionContinue}
            className="bg-brand-purple text-white px-8 py-3 rounded-full font-semibold transition-all hover:bg-brand-purpleDark hover:-translate-y-0.5 shadow-sm hover:shadow"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  if (stage === "transition") {
    return (
      <div className={`flex-grow flex items-center justify-center p-8 bg-slate-900 relative overflow-hidden transition-all duration-400 ease-in-out ${isAnimatingOut ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
        <div className="max-w-[640px] w-full text-center animate-slide-in-up">
          <span className="block text-slate-400 text-[14px] font-medium mb-3">
            {card.day}
          </span>
          <span className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-brand-yellow mb-6">
            ● Meanwhile
          </span>
          <p className="font-display text-[22px] md:text-[26px] font-medium text-slate-100 leading-relaxed mb-10">
            {card.transition}
          </p>
          <button 
            onClick={handleTransitionContinue}
            className="bg-brand-yellow text-slate-900 px-8 py-3 rounded-full font-bold transition-all hover:bg-brand-yellowDark hover:-translate-y-0.5 shadow-sm hover:shadow"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-grow flex flex-col md:flex-row relative overflow-hidden transition-all duration-400 ease-in-out bg-slate-50 ${isAnimatingOut ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>

      {/* Left Column: Scenario */}
      <div className="w-full md:w-[45%] lg:w-[40%] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 border-r border-slate-200 bg-white shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
        
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-brand-purple/10 text-brand-purple text-[13px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {card.act}
          </div>
          <div className="text-slate-400 text-[13px] font-medium tracking-wide">
            Scene {card.num} / {totalCards}
          </div>
        </div>

        <div className="font-display text-[28px] md:text-[36px] lg:text-[42px] font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
          {card.title}
        </div>
        
        <div className="text-[15px] md:text-[17px] text-slate-600 leading-relaxed font-light mb-8 max-w-[480px]">
          {card.connector}
        </div>
      </div>

      {/* Right Column: Options & Reaction */}
      <div className="w-full md:w-[55%] lg:w-[60%] p-6 md:p-10 lg:p-16 flex flex-col justify-center relative z-10">
        
        {!answered && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full max-w-[800px] mx-auto animate-slide-in-up">
            {card.options.map((opt, idx) => (
              <button
                key={opt.label}
                onClick={() => handleSelect(opt)}
                onMouseEnter={() => setHoveredOption(opt.label)}
                onMouseLeave={() => setHoveredOption(null)}
                className={`group relative text-left p-6 lg:p-8 rounded-3xl border transition-all duration-300 flex flex-col gap-4 overflow-hidden shadow-sm
                  ${hoveredOption === opt.label 
                    ? 'bg-white border-brand-purple shadow-md -translate-y-1' 
                    : 'bg-white border-slate-200 hover:border-brand-purple'
                  }`}
              >
                {/* Number Badge */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors
                  ${hoveredOption === opt.label ? 'bg-brand-purple text-white' : 'bg-slate-100 text-slate-500'}
                `}>
                  {idx + 1}
                </div>
                
                <div className={`text-[15px] lg:text-[17px] leading-relaxed transition-colors font-medium
                  ${hoveredOption === opt.label ? 'text-slate-900' : 'text-slate-700'}
                `}>
                  {opt.text}
                </div>
              </button>
            ))}
          </div>
        )}

        {isProcessing && (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-brand-purple border-t-transparent animate-spin"></div>
            <div className="text-brand-purple font-medium tracking-widest uppercase text-sm animate-pulse">Processing...</div>
          </div>
        )}
      </div>
    </div>
  );
}
