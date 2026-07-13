import { Meters, SkillLogEntry } from "../data/types";
import { PERSONAS } from "../data/personas";
import { User, CheckCircle2, AlertCircle, BarChart2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

type ResultsScreenProps = {
  meters: Meters;
  skillLog: SkillLogEntry[];
  onRestart: () => void;
  personaOverride?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export function ResultsScreen({
  meters,
  skillLog,
  onRestart,
  personaOverride,
}: ResultsScreenProps) {
  const router = useRouter();
  const order = ["rep", "inf", "gro", "imp"] as (keyof Meters)[];

  // If personaOverride is provided by the backend, use it. Otherwise, calculate locally.
  let persona = personaOverride;
  if (!persona) {
    const sorted = [...order].sort((a, b) => meters[b] - meters[a]);
    const top2 = [sorted[0], sorted[1]].sort();
    const key = top2.join(",");
    persona = PERSONAS[key] || PERSONAS["rep,imp"];
  }

  // Normalize meters
  const norm = (v: number) =>
    Math.max(0, Math.min(100, Math.round(((v + 20) / 50) * 100)));

  // Aggregate skills
  const agg: Record<string, { count: number; total: number }> = {};
  skillLog.forEach((s) => {
    if (!agg[s.skill]) agg[s.skill] = { count: 0, total: 0 };
    agg[s.skill].count += 1;
    agg[s.skill].total += s.points;
  });

  const rows = Object.keys(agg).map((k) => ({
    skill: k,
    count: agg[k].count,
    total: agg[k].total,
  }));
  rows.sort((a, b) => b.total - a.total);

  const strengths = rows.filter((r) => r.total > 0).slice(0, 5);
  const devs = rows
    .filter((r) => r.total <= 0)
    .sort((a, b) => a.total - b.total)
    .slice(0, 5);

  const labels = {
    rep: "Reputation",
    inf: "Influence",
    gro: "Growth",
    imp: "Impact",
  };

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth");
  };

  return (
    <div className="flex-grow flex flex-col p-6 md:p-10 relative overflow-hidden animate-fade-in bg-slate-50">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-[12px] font-bold text-brand-purple tracking-widest uppercase mb-1">Dashboard</h2>
          <h1 className="font-display text-[28px] font-bold text-slate-900 m-0">Your Assessment Results</h1>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:shadow"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Hero Banner (Purple) */}
      <div className="bg-brand-purple rounded-2xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden shadow-md mb-6 animate-slide-in-up">
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
        <h2 className="font-display text-[24px] md:text-[28px] font-bold text-white m-0 mb-3 relative z-10 flex items-center gap-3">
          Probation Complete 🔥
        </h2>
        <p className="text-[15px] md:text-[16px] text-white/90 font-light leading-relaxed max-w-[600px] relative z-10">
          You&apos;ve completed the 90-day simulation. Based on your decisions across all 30 scenarios, your professional persona has been mapped.
        </p>
      </div>

      {/* Persona Card & Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        
        {/* Persona Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 border-t-4 border-t-brand-yellow rounded-2xl p-6 md:p-8 flex flex-col justify-center shadow-sm relative overflow-hidden animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-[11px] tracking-widest uppercase text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-brand-yellowDark" /> Final Persona
          </div>
          <div className="font-display text-[28px] font-bold text-slate-900 leading-tight mb-3">
            {persona.name}
          </div>
          <div className="text-[14px] text-slate-600 font-light leading-relaxed">
            {persona.desc}
          </div>
        </div>

        {/* Meters */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-4 md:gap-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          {order.map((k, idx) => {
            const borderColors = [
              "border-t-brand-purple",
              "border-t-emerald-500",
              "border-t-sky-500",
              "border-t-rose-500"
            ];
            const bgColors = [
              "bg-brand-purple",
              "bg-emerald-500",
              "bg-sky-500",
              "bg-rose-500"
            ];
            return (
              <div
                key={k}
                className={`bg-white border border-slate-200 border-t-4 ${borderColors[idx]} rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-baseline">
                  <span className="text-[12px] uppercase tracking-widest text-slate-500 font-bold">
                    {labels[k]}
                  </span>
                  <span className="font-mono font-bold text-[24px] text-slate-900">
                    {meters[k]}
                  </span>
                </div>
                <div className="h-[6px] rounded-full w-full bg-slate-100 overflow-hidden relative">
                  <div
                    className={`absolute top-0 bottom-0 left-0 rounded-full transition-all duration-1000 ease-out ${bgColors[idx]}`}
                    style={{ width: `${norm(meters[k])}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills & Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
        
        {/* Strengths & Dev Areas */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <h3 className="font-display text-[18px] font-bold text-slate-900 m-0 mb-5 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Strengths
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {strengths.length > 0 ? (
                strengths.map((r) => (
                  <li key={r.skill} className="flex justify-between items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[14px] text-slate-700 font-medium">{r.skill}</span>
                    <span className="font-mono font-bold text-[13px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                      +{r.total}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-[14px] text-slate-500 italic p-3">No standout strengths recorded</li>
              )}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <h3 className="font-display text-[18px] font-bold text-slate-900 m-0 mb-5 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              Development Areas
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {devs.length > 0 ? (
                devs.map((r) => (
                  <li key={r.skill} className="flex justify-between items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[14px] text-slate-700 font-medium">{r.skill}</span>
                    <span className="font-mono font-bold text-[13px] text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md shrink-0">
                      {r.total}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-[14px] text-slate-500 italic p-3">No significant areas flagged</li>
              )}
            </ul>
          </div>
        </div>

        {/* Full Dashboard Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-7 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-display text-[18px] font-bold text-slate-900 m-0 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-slate-400" />
              Skill Leaderboard
            </h3>
          </div>
          <div className="overflow-x-auto overflow-y-auto max-h-[400px] border border-slate-200 rounded-xl relative hide-scrollbar">
            <table className="w-full border-collapse text-[13px] text-left">
              <thead className="sticky top-0 bg-slate-50 text-slate-500 z-10 shadow-sm border-b border-slate-200">
                <tr>
                  <th className="py-4 px-5 font-semibold tracking-wide uppercase text-[11px]">
                    Skill Register
                  </th>
                  <th className="py-4 px-5 font-semibold tracking-wide uppercase text-[11px] w-24 text-center">
                    Observed
                  </th>
                  <th className="py-4 px-5 font-semibold tracking-wide uppercase text-[11px] w-24 text-center">
                    Net Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.skill} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-5 text-slate-700 font-medium">{r.skill}</td>
                    <td className="py-3.5 px-5 text-center text-slate-500 font-mono">{r.count}</td>
                    <td className="py-3.5 px-5 text-center">
                      <span className={`font-mono font-bold inline-block px-2 py-1 rounded-md text-[12px] ${
                        r.total > 0 ? "text-emerald-700 bg-emerald-100" : r.total < 0 ? "text-rose-700 bg-rose-100" : "text-slate-500 bg-slate-100"
                      }`}>
                        {r.total > 0 ? "+" : ""}{r.total}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100 mt-6">
            <div className="text-[12px] text-slate-500 font-light leading-relaxed max-w-[400px]">
              Choices are scored against the TeamNitro Register and roll up into four meters. Persona is derived from the top two.
            </div>
            <button
              onClick={onRestart}
              className="bg-brand-yellow text-slate-900 py-3 px-8 rounded-full font-bold text-[14px] cursor-pointer hover:bg-brand-yellowDark transition-all shadow-sm whitespace-nowrap"
            >
              Restart Simulation
            </button>
          </div>
        </div>

      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
