"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Gamepad2 } from "lucide-react";

function InviteReceiverPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Authenticating...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      const token = searchParams.get("token");
      
      if (!token) {
        setError("No magic link token found. Please ask your recruiter for a valid invite link.");
        return;
      }

      try {
        const res = await fetch("/api/auth/magic-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setStatus("Success! Redirecting to assessment...");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          setError(data.error || "Failed to authenticate your magic link.");
        }
      } catch (err) {
        console.error(err);
        setError("A network error occurred. Please try again.");
      }
    };

    authenticate();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-purple/10 via-slate-50 to-slate-50 pointer-events-none"></div>

      <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-purple/30">
          <Gamepad2 className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
          WorkReady™
        </h1>

        {error ? (
          <>
            <div className="text-rose-500 bg-rose-50 px-4 py-3 rounded-lg text-sm mb-4 border border-rose-100">
              {error}
            </div>
          </>
        ) : (
          <>
            <div className="text-slate-500 mb-8">{status}</div>
            <div className="w-8 h-8 rounded-full border-2 border-brand-purple border-t-transparent animate-spin"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default function InviteReceiverPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="w-8 h-8 rounded-full border-2 border-brand-purple border-t-transparent animate-spin"></div>
      </div>
    }>
      <InviteReceiverPageContent />
    </Suspense>
  );
}
