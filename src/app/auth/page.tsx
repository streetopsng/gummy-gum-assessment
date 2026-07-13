"use client";

import { Gamepad2 } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-purple/10 via-slate-50 to-slate-50 pointer-events-none"></div>

      <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md relative z-10 flex flex-col items-center text-center">
        
        <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-purple/30">
          <Gamepad2 className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
          WorkReady™ Africa
        </h1>
        
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8">
          Access to this assessment is by invitation only. Please check your email for your unique magic link provided by your recruiter.
        </p>

        <div className="bg-slate-50 border border-slate-200 w-full p-4 rounded-xl text-[13px] text-slate-500 font-medium italic mb-6">
          If you received an invite link, simply click it to begin.
        </div>

        <div className="pt-6 border-t border-slate-100 w-full">
          <p className="text-[13px] text-slate-500 font-medium">
            Are you a Recruiter?{" "}
            <a href="/admin/login" className="text-brand-purple font-bold hover:underline transition-all">
              Log in to your workspace
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
