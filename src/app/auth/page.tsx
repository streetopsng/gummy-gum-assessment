"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/public-start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/");
      } else {
        setError(data.error || "Failed to start assessment");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("A network error occurred. Please try again.");
      setLoading(false);
    }
  };

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
          Welcome to the assessment. Please enter your details to begin.
        </p>

        {error && (
          <div className="text-rose-500 bg-rose-50 px-4 py-3 rounded-lg text-sm mb-4 border border-rose-100 w-full">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 text-left mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/30"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/30"
              placeholder="jane@example.com"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full py-3 bg-brand-purple text-white rounded-lg font-bold hover:bg-brand-purpleDark transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>Start Assessment <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

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
