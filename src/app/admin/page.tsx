"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  LogOut,
  Car,
  UserCheck,
  CheckCircle,
  Zap,
  Target,
  TrendingUp,
  X,
  ChevronRight
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isWelcome = searchParams.get("welcome") === "true";
  const [showWelcome, setShowWelcome] = useState(isWelcome);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Detailed view state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Invite state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/candidates")
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth");
  };

  const openCandidateDetails = async (userId: string) => {
    setSelectedUserId(userId);
    setDetailsLoading(true);
    try {
      const res = await fetch(`/api/admin/candidates/${userId}`);
      const d = await res.json();
      setDetails(d);
    } catch (e) {
      console.error(e);
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedUserId(null);
    setDetails(null);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    try {
      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inviteName, email: inviteEmail })
      });
      const d = await res.json();
      if (d.magicLink) {
        setInviteLink(d.magicLink);
      } else {
        alert(d.error || "Failed to generate magic link. Please check server logs.");
      }
    } catch (e) {
      console.error(e);
      alert("A network error occurred. Please try again.");
    } finally {
      setInviting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-purple border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 relative">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="font-display font-bold text-[18px] text-slate-900 tracking-tight">
            WorkReady™
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6 px-4 flex flex-col gap-8 overflow-y-auto">
          <div>
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3 px-3">Recruitment</div>
            <nav className="flex flex-col gap-1">
              <a href="/admin" className="flex items-center gap-3 px-3 py-2.5 bg-brand-purple/5 text-brand-purple rounded-lg font-medium text-[14px]">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </a>
              <a href="#candidates" className="flex items-center justify-between px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-[14px] transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" /> Candidates
                </div>
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">{data.candidates.length}</span>
              </a>
            </nav>
          </div>

          <div>
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3 px-3">Platform</div>
            <nav className="flex flex-col gap-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-[14px] transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </a>
            </nav>
          </div>
        </div>
      </aside>

      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative p-10 text-center">
            <div className="w-20 h-20 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-purple">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Organization Created!</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Welcome to the WorkReady™ HR Portal. Your secure environment is ready. 
              Any candidates you invite will be isolated to your organization.
            </p>
            <button 
              onClick={() => {
                setShowWelcome(false);
                router.replace("/admin");
              }}
              className="w-full py-3.5 bg-brand-purple text-white rounded-xl font-bold hover:bg-brand-purpleDark transition-colors shadow-lg shadow-brand-purple/20"
            >
              Enter Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen relative">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search candidates by name or email..." 
              className="w-full bg-slate-100 border-none rounded-full pl-10 pr-4 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-brand-purple/30 transition-shadow"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors relative">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center text-white text-[12px] font-bold">
                HR
              </div>
              <span className="text-[14px] font-bold">Admin</span>
              <span className="text-[10px] font-bold text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded uppercase tracking-wider">Recruiter</span>
            </div>
            <button onClick={handleSignOut} className="ml-2 text-slate-400 hover:text-slate-700 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-6xl w-full mx-auto animate-fade-in">
          
          <div className="mb-8 flex justify-between items-end">
            <div>
              <div className="text-[11px] font-bold text-brand-purple tracking-widest uppercase mb-2">Dashboard</div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Candidate Overview</h1>
              <p className="text-slate-500 text-[14px] max-w-xl leading-relaxed">
                Review candidate assessment results, behavior profiles, and specific scenario responses.
              </p>
            </div>
          </div>

          {/* Hero Banner */}
          <div className="bg-brand-purple rounded-2xl p-8 text-white relative overflow-hidden mb-6 shadow-md flex justify-between items-center">
            <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-brand-purpleDark/40 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">Assessment Cohort Active 🔥</h2>
              <p className="text-white/80 text-[15px] font-light max-w-xl">
                WorkReady™ Africa has processed {data.metrics.totalSessions} assessments with a {data.metrics.attendanceRate}% average completion rate.
              </p>
            </div>
            <div className="relative z-10 flex gap-3">
              <button onClick={() => setShowInviteModal(true)} className="px-5 py-2.5 rounded-full bg-brand-yellow text-slate-900 hover:bg-brand-yellowDark transition-colors font-bold text-[14px]">
                Invite Candidate
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-slate-200 border-t-4 border-t-brand-purple rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                <Car className="w-3 h-3" /> Total Assessments
              </div>
              <div className="text-3xl font-bold mb-1">{data.metrics.totalSessions}</div>
              <div className="text-[12px] text-slate-400">All time</div>
            </div>
            
            <div className="bg-white border border-slate-200 border-t-4 border-t-brand-yellow rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                <UserCheck className="w-3 h-3" /> Total Participants
              </div>
              <div className="text-3xl font-bold mb-1">{data.metrics.totalParticipants}</div>
              <div className="text-[12px] text-slate-400">Unique members</div>
            </div>

            <div className="bg-white border border-slate-200 border-t-4 border-t-emerald-500 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                <CheckCircle className="w-3 h-3" /> Avg. Completion Rate
              </div>
              <div className="text-3xl font-bold mb-1">{data.metrics.attendanceRate}%</div>
              <div className="text-[12px] text-slate-400">Across all candidates</div>
            </div>

            <div className="bg-white border border-slate-200 border-t-4 border-t-sky-500 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                <Zap className="w-3 h-3" /> Avg. Engagement
              </div>
              <div className="text-3xl font-bold mb-1">
                {data.metrics.avgEngagement} <span className="text-xl text-slate-400 font-medium">/10</span>
              </div>
              <div className="text-[12px] text-slate-400">Mock metric</div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div id="candidates" className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                <h3 className="text-[16px] font-bold text-slate-900 mb-1">Candidate Directory</h3>
                <p className="text-[13px] text-slate-500 font-light">Click on a candidate to view their detailed responses.</p>
              </div>
            </div>
            
            <table className="w-full text-left text-[14px]">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-6 font-semibold text-[12px] uppercase tracking-wider">Candidate</th>
                  <th className="py-3 px-6 font-semibold text-[12px] uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 font-semibold text-[12px] uppercase tracking-wider">Progress</th>
                  <th className="py-3 px-6 font-semibold text-[12px] uppercase tracking-wider">Final Persona</th>
                  <th className="py-3 px-6 font-semibold text-[12px] uppercase tracking-wider">Alignment Score</th>
                  <th className="py-3 px-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.candidates.map((c: any) => (
                  <tr 
                    key={c.id} 
                    onClick={() => openCandidateDetails(c.id)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[12px] border border-slate-200">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-brand-purple transition-colors">{c.name}</div>
                          <div className="text-[12px] text-slate-500">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase ${
                        c.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-yellow/20 text-brand-yellowDark'
                      }`}>
                        {c.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">
                      {c.progress} / 30
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-900">
                      {c.persona}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-900">
                      {c.status === 'Completed' ? (
                        <span className={`inline-flex px-2 py-1 rounded text-[12px] font-bold ${c.alignmentScore >= 60 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {c.alignmentScore}%
                        </span>
                      ) : '-'}
                    </td>
                    <td className="py-4 px-6 text-right text-slate-300 group-hover:text-brand-purple transition-colors">
                      <ChevronRight className="w-5 h-5 inline-block" />
                    </td>
                  </tr>
                ))}
                {data.candidates.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      No candidates have started the assessment yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-lg text-slate-900">Invite Candidate</h2>
              <button onClick={() => {setShowInviteModal(false); setInviteLink("");}} className="text-slate-400 hover:text-slate-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {inviteLink ? (
                <div className="flex flex-col gap-4 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">Invite Generated!</h3>
                  <p className="text-sm text-slate-500 mb-2">Copy this magic link and send it to {inviteName}. They won't need a password.</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-mono text-slate-700 break-all select-all relative group cursor-text">
                    {inviteLink}
                  </div>
                  <button 
                    onClick={() => {setShowInviteModal(false); setInviteLink(""); setInviteName(""); setInviteEmail("");}}
                    className="mt-2 w-full py-2.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInvite} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Candidate Name</label>
                    <input 
                      type="text" 
                      value={inviteName} 
                      onChange={e => setInviteName(e.target.value)} 
                      required 
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/30"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      value={inviteEmail} 
                      onChange={e => setInviteEmail(e.target.value)} 
                      required 
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/30"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={inviting}
                    className="mt-4 w-full py-3 bg-brand-purple text-white rounded-lg font-bold hover:bg-brand-purpleDark transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {inviting ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating...</>
                    ) : "Generate Magic Link"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Detailed View */}
      {selectedUserId && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={closeDetails}
          />
          
          {/* Panel */}
          <div className={`fixed top-0 right-0 h-full w-[600px] max-w-full bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${selectedUserId ? 'translate-x-0' : 'translate-x-full'}`}>
            
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-8 shrink-0 bg-white">
              <h2 className="font-bold text-[16px]">Candidate Details</h2>
              <button onClick={closeDetails} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {detailsLoading || !details ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-brand-purple border-t-transparent animate-spin"></div>
              </div>
            ) : details.error ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
                <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-3">
                  <X className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Could not load details</h3>
                <p>{details.error}</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-8">
                
                {/* Header Info */}
                <div className="mb-8 flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{details.user.name}</h1>
                    <p className="text-slate-500 text-[14px]">{details.user.email}</p>
                  </div>
                  {details.user.status === 'Completed' && (
                    <div className="text-right">
                      <div className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-1">Alignment Score</div>
                      <div className={`text-3xl font-bold ${details.user.alignmentScore >= 60 ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {details.user.alignmentScore}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Persona Block */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                  <div className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mb-2">Final Persona</div>
                  <div className="text-xl font-bold text-brand-purple mb-2">{details.user.persona}</div>
                  <p className="text-[14px] text-slate-600 leading-relaxed">{details.user.personaDesc || "Persona description not available."}</p>
                </div>

                {/* Performance Breakdown */}
                {details.user.status === 'Completed' && details.scoreBreakdown && (
                  <div className="mb-10">
                    <div className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                      Performance by Act
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.keys(details.scoreBreakdown.maxPointsPerAct).map(act => {
                        const max = details.scoreBreakdown.maxPointsPerAct[act];
                        const earned = details.scoreBreakdown.candidatePointsPerAct[act];
                        const pct = max > 0 ? Math.max(0, Math.round((earned / max) * 100)) : 0;
                        return (
                          <div key={act} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">{act}</div>
                            <div className="flex justify-between items-end mb-2">
                              <div className="text-lg font-bold text-slate-900">{earned} <span className="text-sm font-medium text-slate-400">/ {max} pts</span></div>
                              <div className={`text-[12px] font-bold ${pct >= 60 ? 'text-emerald-600' : 'text-brand-yellowDark'}`}>{pct}%</div>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div className={`h-full rounded-full ${pct >= 60 ? 'bg-emerald-500' : 'bg-brand-yellow'}`} style={{ width: `${pct}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Meters */}
                <div className="grid grid-cols-4 gap-3 mb-10">
                  {Object.entries(details.meters).map(([key, val]) => (
                    <div key={key} className="bg-white border border-slate-200 rounded-lg p-4 text-center shadow-sm">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{key}</div>
                      <div className="text-xl font-mono font-bold text-slate-900">{String(val)}</div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div>
                  <div className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
                    Assessment Timeline ({details.timeline.length}/30)
                  </div>
                  
                  <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 pb-8">
                    {details.timeline.map((resp: any, i: number) => (
                      <div key={resp.id} className="relative pl-6">
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-brand-purple ring-4 ring-white"></div>
                        
                        <div className="text-[11px] font-bold text-brand-purple tracking-widest uppercase mb-1">
                          {resp.act} — Scene {resp.sceneNum}
                        </div>
                        <h4 className="font-bold text-[15px] text-slate-900 mb-2">{resp.title}</h4>
                        <p className="text-[13px] text-slate-500 mb-4 italic leading-relaxed">"{resp.question}"</p>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Candidate Selected</div>
                          <div className="text-[14px] font-medium text-slate-800 flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-brand-purple/10 text-brand-purple text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {resp.selectedLabel}
                            </span>
                            {resp.selectedText}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}
