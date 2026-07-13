import { Meters } from "../data/types";

type TopBarProps = {
  meters: Meters;
  progressPercent: number;
};

export function TopBar({ meters, progressPercent }: TopBarProps) {
  return (
    <div className="w-full bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 z-20 shadow-sm">
      
      {/* Brand & Progress */}
      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="font-display font-bold text-[18px] text-slate-900 tracking-tight shrink-0">
          WorkReady™
        </div>
        
        {/* Progress Bar */}
        <div className="flex-grow md:w-64 flex items-center gap-3">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest shrink-0 w-8">
            {Math.round(progressPercent)}%
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-purple rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hidden Live Meters (for Dev/Testing) */}
      <div className="flex gap-4 opacity-0 hover:opacity-100 transition-opacity">
        {["rep", "inf", "gro", "imp"].map((key) => (
          <div key={key} className="flex flex-col items-center">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{key}</span>
            <span className="text-[13px] font-mono font-bold text-slate-700">{meters[key as keyof Meters]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
