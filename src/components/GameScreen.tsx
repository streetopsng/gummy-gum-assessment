import { useState, useEffect } from "react";
import { Card, Option } from "../data/types";

type GameScreenProps = {
  card: Card;
  totalCards: number;
  onOptionSelect: (optionLabel: string) => Promise<any>;
  onContinue: (nextStateData: any) => void;
};

export function GameScreen({
  card,
  totalCards,
  onOptionSelect,
  onContinue,
}: GameScreenProps) {
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [reactionText, setReactionText] = useState("");
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [nextGameStateData, setNextGameStateData] = useState<any>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  useEffect(() => {
    setAnswered(false);
    setSelectedOption(null);
    setReactionText("");
    setIsAnimatingOut(false);
    setHoveredOption(null);
  }, [card.num]);

  const handleSelect = async (option: Option) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(option);
    
    // Show temporary loading text while waiting for backend
    setReactionText("Processing...");
    
    try {
      const response = await onOptionSelect(option.label);
      setIsAnimatingOut(true);
      setTimeout(() => {
        onContinue(response);
      }, 400);
    } catch (e) {
      setReactionText("Network error. Please try again.");
    }
  };

  const handleContinueClick = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onContinue(nextGameStateData);
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (answered) return;
      
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
  }, [answered, card.options]);

  const isProcessing = reactionText === "Processing...";

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
            <div className="text-brand-purple font-medium tracking-widest uppercase text-sm animate-pulse">Saving...</div>
          </div>
        )}
      </div>
    </div>
  );
}
