import { useState, useEffect, useRef } from "react";
import { X, Bell, ChevronRight, CheckCircle2, AlertTriangle, ExternalLink, MessageCircle, Instagram, Clock, Trophy, BookOpen } from "lucide-react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/IE6RwQ5yhOx5JfYDu14Hxd";
const INSTAGRAM_LINK = "https://www.instagram.com/fetch.ai.rcpit/";
const RULEBOOK_LINK = "https://drive.google.com/file/d/1Bu7mQyYNh2vrX4FciTq8aVelc3Z1kICf/view?usp=sharing";

// Registration closes: March 1 2026, 8:00 PM IST
const REG_CLOSE_TIME = new Date("2026-03-01T20:00:00+05:30");

interface NoticeBannerProps {
      onDismiss: () => void;
      onHeightChange: (h: number) => void;
}

function useCountdown(target: Date) {
      const calc = () => {
            const diff = target.getTime() - Date.now();
            if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, done: true };
            const totalSec = Math.floor(diff / 1000);
            return {
                  hours: Math.floor(totalSec / 3600),
                  minutes: Math.floor((totalSec % 3600) / 60),
                  seconds: totalSec % 60,
                  done: false,
            };
      };

      const [state, setState] = useState(calc);

      useEffect(() => {
            const id = setInterval(() => setState(calc()), 1000);
            return () => clearInterval(id);
      }, []);

      return state;
}

const pad = (n: number) => String(n).padStart(2, "0");

const NoticeBanner = ({ onDismiss, onHeightChange }: NoticeBannerProps) => {
      const [show, setShow] = useState(false);
      const [hiding, setHiding] = useState(false);
      const [modalOpen, setModalOpen] = useState(false);
      const bannerRef = useRef<HTMLDivElement>(null);
      const countdown = useCountdown(REG_CLOSE_TIME);
      const regClosed = countdown.done;

      // Appear on load (unless dismissed this session)
      useEffect(() => {
            const dismissed = sessionStorage.getItem("noticeDismissed");
            if (!dismissed) {
                  const t = setTimeout(() => setShow(true), 200);
                  return () => clearTimeout(t);
            }
      }, []);

      // Auto-open the popup on load (first time)
      useEffect(() => {
            if (show) {
                  const alreadyOpened = sessionStorage.getItem("noticeModalOpened");
                  if (!alreadyOpened) {
                        setModalOpen(true);
                        sessionStorage.setItem("noticeModalOpened", "true");
                  }
            }
      }, [show]);

      // Measure actual banner height dynamically
      useEffect(() => {
            if (!show || !bannerRef.current) return;
            const updateHeight = () => {
                  if (bannerRef.current) onHeightChange(bannerRef.current.offsetHeight);
            };
            updateHeight();
            const ro = new ResizeObserver(updateHeight);
            ro.observe(bannerRef.current);
            return () => ro.disconnect();
      }, [show, onHeightChange]);

      const dismiss = (e: React.MouseEvent) => {
            e.stopPropagation();
            setHiding(true);
            onHeightChange(0);
            setTimeout(() => {
                  setShow(false);
                  onDismiss();
                  sessionStorage.setItem("noticeDismissed", "true");
            }, 350);
      };

      if (!show) return null;

      return (
            <>
                  {/* ── Top Banner ── */}
                  <div
                        ref={bannerRef}
                        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-350 ${hiding ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"}`}
                  >
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan to-transparent" />
                        <div
                              className="relative bg-background/95 backdrop-blur-md border-b border-cyan/30 shadow-[0_4px_20px_rgba(6,182,212,0.15)] cursor-pointer group"
                              onClick={() => setModalOpen(true)}
                        >
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 via-transparent to-cyan/5 animate-pulse pointer-events-none" />
                              <div className="relative px-4 py-2.5 pr-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 max-w-7xl mx-auto">
                                    {/* Pulsing bell */}
                                    <div className="relative flex-shrink-0">
                                          <div className="absolute inset-0 rounded-full bg-cyan/30 animate-ping" />
                                          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-cyan/20 border border-cyan/50">
                                                <Bell size={11} className="text-cyan" />
                                          </div>
                                    </div>

                                    {regClosed ? (
                                          /* ── AFTER 8 PM: Registration Closed ── */
                                          <>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500 text-black text-[9px] font-orbitron font-bold tracking-widest uppercase flex-shrink-0 animate-pulse">
                                                      Update
                                                </span>
                                                <p className="text-xs sm:text-sm text-white/90 font-medium text-center leading-snug">
                                                      <span className="text-red-400 font-semibold">Registration is now closed.</span>{" "}
                                                      <span className="text-amber-300 font-semibold">Results will be posted soon — stay tuned!</span>
                                                </p>
                                          </>
                                    ) : (
                                          /* ── BEFORE 8 PM: Countdown ── */
                                          <>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-orbitron font-bold tracking-widest uppercase flex-shrink-0 animate-pulse">
                                                      Urgent
                                                </span>
                                                <p className="text-xs sm:text-sm text-white/90 font-medium text-center leading-snug">
                                                      <span className="text-red-400 font-semibold">Registration closes today at 8 PM!</span>{" "}
                                                      <span className="text-cyan font-mono font-bold">
                                                            {pad(countdown.hours)}h {pad(countdown.minutes)}m {pad(countdown.seconds)}s
                                                      </span>
                                                      <span className="text-white/60"> remaining</span>
                                                </p>
                                          </>
                                    )}

                                    <button
                                          onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
                                          id="notice-view-btn"
                                          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan/50 text-cyan text-[10px] font-orbitron font-bold tracking-wide hover:bg-cyan/20 group-hover:border-cyan transition-all duration-300 whitespace-nowrap"
                                    >
                                          <span>View Notice</span>
                                          <ChevronRight size={11} />
                                    </button>
                              </div>

                              <button
                                    onClick={dismiss}
                                    id="notice-dismiss-btn"
                                    aria-label="Dismiss notice"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                              >
                                    <X size={14} />
                              </button>
                        </div>
                  </div>

                  {/* ── Modal Popup ── */}
                  {modalOpen && (
                        <div
                              className="fixed inset-0 z-[80] flex items-center justify-center p-4"
                              onClick={() => setModalOpen(false)}
                        >
                              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                              <div
                                    className="relative w-full max-w-lg bg-[hsl(220,20%,6%)] border border-cyan/30 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-300"
                                    onClick={(e) => e.stopPropagation()}
                              >
                                    {/* Header */}
                                    <div className="relative px-6 py-4 border-b border-white/5 bg-gradient-to-r from-cyan/10 to-transparent">
                                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
                                          <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan/20 border border-cyan/40">
                                                      {regClosed ? (
                                                            <Trophy size={15} className="text-amber-400" />
                                                      ) : (
                                                            <Clock size={15} className="text-red-400" />
                                                      )}
                                                </div>
                                                <div>
                                                      <h2 className="font-orbitron text-sm font-bold text-white tracking-wide">
                                                            {regClosed ? "Registration Closed" : "Registration Closing Soon"}
                                                      </h2>
                                                      <p className="text-[10px] text-white/40 font-mono mt-0.5">
                                                            CodeCraze 3.0 &middot;{" "}
                                                            {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                                      </p>
                                                </div>
                                                {regClosed ? (
                                                      <span className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-900/50 border border-red-500/30 text-red-400 text-[9px] font-mono tracking-wider uppercase">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                                                            Closed
                                                      </span>
                                                ) : (
                                                      <span className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-900/50 border border-red-500/30 text-red-400 text-[9px] font-mono tracking-wider uppercase">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
                                                            Urgent
                                                      </span>
                                                )}
                                          </div>
                                    </div>

                                    {/* Body */}
                                    <div className="px-6 py-5 space-y-4">
                                          {regClosed ? (
                                                /* ── AFTER 8 PM MODAL BODY ── */
                                                <>
                                                      <p className="text-sm text-white/80 leading-relaxed">
                                                            Registrations for <span className="text-cyan font-semibold">CodeCraze 3.0</span> have officially closed. Thank you to everyone who participated!
                                                      </p>
                                                      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-950/40 border border-amber-700/40">
                                                            <Trophy size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                                            <div>
                                                                  <p className="text-sm font-semibold text-amber-300">Results Coming Soon!</p>
                                                                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                                                                        The results will be announced shortly. Stay connected on our WhatsApp community and Instagram for the latest updates.
                                                                  </p>
                                                            </div>
                                                      </div>
                                                      <div className="flex items-start gap-3 p-3 rounded-xl bg-green-950/40 border border-green-800/40">
                                                            <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                                                            <p className="text-sm text-white/80 leading-snug">
                                                                  All registered participants have been <span className="text-green-400 font-medium">successfully recorded.</span>
                                                            </p>
                                                      </div>
                                                </>
                                          ) : (
                                                /* ── BEFORE 8 PM MODAL BODY ── */
                                                <>
                                                      <p className="text-sm text-white/80 leading-relaxed">
                                                            This is your last chance! Registration for{" "}
                                                            <span className="text-cyan font-semibold">CodeCraze 3.0</span> closes{" "}
                                                            <span className="text-red-400 font-semibold">today at 8:00 PM.</span>
                                                      </p>

                                                      {/* Countdown Block */}
                                                      <div className="p-4 rounded-xl bg-red-950/40 border border-red-700/40 flex flex-col items-center gap-2">
                                                            <p className="text-[10px] font-mono text-red-400 uppercase tracking-widest">Time Remaining</p>
                                                            <div className="flex items-center gap-3">
                                                                  {[
                                                                        { val: countdown.hours, label: "HRS" },
                                                                        { val: countdown.minutes, label: "MIN" },
                                                                        { val: countdown.seconds, label: "SEC" },
                                                                  ].map(({ val, label }, i) => (
                                                                        <div key={i} className="flex flex-col items-center">
                                                                              <span className="font-orbitron text-2xl font-bold text-white tabular-nums">{pad(val)}</span>
                                                                              <span className="text-[9px] text-red-400/70 tracking-widest font-mono">{label}</span>
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                      </div>

                                                      <div className="flex items-start gap-3 p-3 rounded-xl bg-cyan/5 border border-cyan/20">
                                                            <AlertTriangle size={16} className="text-cyan flex-shrink-0 mt-0.5" />
                                                            <p className="text-sm text-white/80 leading-snug">
                                                                  Don't miss out — register now before the deadline on{" "}
                                                                  <span className="text-cyan font-medium">Unstop!</span>
                                                            </p>
                                                      </div>
                                                </>
                                          )}

                                          {/* Rule Book */}
                                          <a
                                                href={RULEBOOK_LINK}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-xl bg-amber-950/40 border border-amber-500/50 hover:border-amber-400 hover:bg-amber-950/60 transition-all duration-200 group"
                                          >
                                                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40">
                                                      <BookOpen size={15} className="text-amber-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                      <p className="text-xs font-semibold text-amber-300">📋 Check the Rule Book!</p>
                                                      <p className="text-[10px] text-white/50 mt-0.5">Read all rules & guidelines before registering</p>
                                                </div>
                                                <span className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500 text-black text-[10px] font-orbitron font-bold group-hover:bg-amber-400 transition-all duration-200 whitespace-nowrap">
                                                      View <ExternalLink size={9} />
                                                </span>
                                          </a>

                                          {/* WhatsApp Community */}
                                          <div className="flex items-center gap-3 p-3 rounded-xl bg-green-900/30 border border-green-600/40">
                                                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40">
                                                      <MessageCircle size={15} className="text-green-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                      <p className="text-xs font-semibold text-green-300">Join our WhatsApp Community</p>
                                                      <p className="text-[10px] text-white/50 mt-0.5">Real-time updates, announcements &amp; support</p>
                                                </div>
                                                <a
                                                      href={WHATSAPP_LINK}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500 text-white text-[10px] font-orbitron font-bold hover:bg-green-400 transition-all duration-200 whitespace-nowrap"
                                                >
                                                      <span>Join</span>
                                                      <ExternalLink size={9} />
                                                </a>
                                          </div>

                                          {/* Instagram */}
                                          <div className="flex items-center gap-3 p-3 rounded-xl border border-pink-500/30" style={{ background: 'linear-gradient(135deg, rgba(131,58,180,0.15), rgba(253,29,29,0.1), rgba(252,176,69,0.1))' }}>
                                                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-pink-500/40" style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', opacity: 0.85 }}>
                                                      <Instagram size={15} className="text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                      <p className="text-xs font-semibold text-pink-300">Follow us on Instagram</p>
                                                      <p className="text-[10px] text-white/50 mt-0.5">@fetch.ai.rcpit — Updates &amp; highlights</p>
                                                </div>
                                                <a
                                                      href={INSTAGRAM_LINK}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] font-orbitron font-bold hover:opacity-90 transition-all duration-200 whitespace-nowrap"
                                                      style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}
                                                >
                                                      <span>Follow</span>
                                                      <ExternalLink size={9} />
                                                </a>
                                                {/* <a
                                                      href="https://docs.google.com/presentation/d/1clbR3_r71ku3rxmLdHmAFs6aZPqc2ogo/edit?slide=id.p1#slide=id.p1"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center gap-2 px-3 py-2 rounded-full border border-cyan/40 bg-cyan/5 text-cyan text-xs font-orbitron font-bold hover:bg-cyan/20 transition-all duration-200"
                                                >
                                                      <span>View PPT</span>
                                                      <ExternalLink size={11} />
                                                </a>
                                                <a
                                                      href={RULEBOOK_LINK}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center gap-2 px-3 py-2 rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-400 text-xs font-orbitron font-bold hover:bg-amber-500/20 transition-all duration-200"
                                                >
                                                      <BookOpen size={11} />
                                                      <span>Rule Book</span>
                                                      <ExternalLink size={11} />
                                                </a> */}
                                          </div>
                                          <button
                                                onClick={() => setModalOpen(false)}
                                                className="px-5 py-2 rounded-full bg-cyan text-black text-xs font-orbitron font-bold hover:bg-cyan/80 transition-all duration-200"
                                          >
                                                Got it
                                          </button>
                                    </div>

                                    {/* Close icon */}
                                    <button
                                          onClick={() => setModalOpen(false)}
                                          className="absolute top-4 right-4 p-1.5 rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                          <X size={15} />
                                    </button>
                              </div>
                        </div>
                  )}
            </>
      );
};

export default NoticeBanner;
