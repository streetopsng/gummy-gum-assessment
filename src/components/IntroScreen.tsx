import { useState } from "react";

type IntroScreenProps = {
  onStart: () => void;
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex-grow flex flex-col md:flex-row h-full relative overflow-hidden bg-slate-50">

      {/* Left Column: Content */}
      <div className="flex-1 p-6 md:p-10 lg:p-16 flex flex-col justify-center z-10">
        <div className="animate-fade-in opacity-0">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold mb-4 w-fit shadow-sm bg-brand-purple/10 border border-brand-purple/20 text-brand-purple">
            <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
            Assessment Prototype
          </span>
        </div>
        
        <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] font-extrabold text-slate-900 m-0 mb-2 leading-[1.05] tracking-tight animate-slide-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
          WorkReady™
          <span className="block text-brand-purple">Africa</span>
        </h1>
        <h2 className="font-display text-[22px] md:text-[28px] font-medium text-slate-500 m-0 mb-4 tracking-wide animate-slide-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
          The First 90 Days
        </h2>
        
        <div className="animate-slide-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <p className="text-[16px] md:text-[18px] leading-relaxed text-slate-600 max-w-[500px] m-0 mb-8 font-light">
            Ready to test your instincts? Step into your first 90 days and see what kind of professional you truly are.
          </p>
        </div>
        
        <div className="animate-slide-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => setShowModal(true)}
            className="group relative bg-brand-yellow text-slate-900 border border-brand-yellowDark py-4 px-10 rounded-full font-bold text-[16px] tracking-wide cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-brand-yellow w-fit overflow-hidden flex items-center gap-3"
          >
            <span className="relative z-10">Begin Simulation</span>
            <svg className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Column: Stats Panel */}
      <div className="w-full md:w-[400px] lg:w-[480px] bg-white border-l border-slate-200 p-8 md:p-12 lg:p-16 flex flex-col justify-center z-10">
        <div className="grid grid-cols-2 gap-4 md:gap-5 animate-slide-in-right opacity-0" style={{ animationDelay: '0.3s' }}>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:bg-white transition-all duration-300 group hover:border-brand-purple hover:shadow-md flex flex-col animate-float hover:animate-none" style={{ animationDelay: '0s' }}>
            <span className="font-display text-[36px] md:text-[44px] font-bold text-slate-900 block mb-1 group-hover:text-brand-purple transition-colors">
              30
            </span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-slate-500 font-medium leading-relaxed block mt-auto">
              Connected<br/>Scenes
            </span>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:bg-white transition-all duration-300 group hover:border-brand-yellow hover:shadow-md flex flex-col animate-dance hover:animate-none" style={{ animationDelay: '-1.5s' }}>
            <span className="font-display text-[36px] md:text-[44px] font-bold text-slate-900 block mb-1 group-hover:text-brand-yellowDark transition-colors">
              120
            </span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-slate-500 font-medium leading-relaxed block mt-auto">
              Scored<br/>Responses
            </span>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:bg-white transition-all duration-300 group hover:border-brand-purple hover:shadow-md flex flex-col animate-dance-slow hover:animate-none" style={{ animationDelay: '-2s' }}>
            <span className="font-display text-[36px] md:text-[44px] font-bold text-slate-900 block mb-1 group-hover:text-brand-purple transition-colors">
              4
            </span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-slate-500 font-medium leading-relaxed block mt-auto">
              Tracked<br/>Meters
            </span>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:bg-white transition-all duration-300 group hover:border-brand-yellow hover:shadow-md flex flex-col animate-float hover:animate-none" style={{ animationDelay: '-3s' }}>
            <span className="font-display text-[36px] md:text-[44px] font-bold text-slate-900 block mb-1 group-hover:text-brand-yellowDark transition-colors">
              6
            </span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-slate-500 font-medium leading-relaxed block mt-auto">
              Possible<br/>Personas
            </span>
          </div>
        </div>
      </div>

      {/* Instructions Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 max-w-lg w-full shadow-2xl relative animate-slide-in-up">
            <h3 className="font-display text-[24px] font-bold text-slate-900 mb-4">
              Simulation Instructions
            </h3>
            <p className="text-[16px] leading-relaxed text-slate-600 mb-4 font-light">
              You&apos;ve just joined NovaCore Africa. Over the next ninety days you&apos;ll face the same thirty moments every new hire faces — bridge traffic, a lost onboarding file, a red-inked first report, an angry client, a stretch assignment nobody wants. What happens next never changes. How you respond does.
            </p>
            <p className="text-[15px] leading-relaxed text-slate-500 mb-8 font-light italic">
              This is a fixed-sequence simulation. Everyone sees the same thirty scenes, in the same order. Your choices are scored, not routed.
            </p>
            <div className="flex gap-4 justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-3 rounded-full text-slate-500 hover:text-slate-800 transition-colors text-sm font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={onStart}
                className="bg-brand-purple text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:bg-brand-purpleDark hover:shadow-md hover:-translate-y-0.5"
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
