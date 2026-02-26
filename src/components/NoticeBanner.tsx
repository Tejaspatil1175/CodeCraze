import { useState, useEffect, useRef } from "react";
import { X, Bell, ChevronRight, CheckCircle2, AlertTriangle, ExternalLink, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/IE6RwQ5yhOx5JfYDu14Hxd";

interface NoticeBannerProps {
      onDismiss: () => void;
      onHeightChange: (h: number) => void;
}

const NoticeBanner = ({ onDismiss, onHeightChange }: NoticeBannerProps) => {
      const [show, setShow] = useState(false);
      const [hiding, setHiding] = useState(false);
      const [modalOpen, setModalOpen] = useState(false);
      const bannerRef = useRef<HTMLDivElement>(null);

      // Appear on load (unless dismissed this session)
      useEffect(() => {
            const dismissed = sessionStorage.getItem("noticeDismissed");
            if (!dismissed) {
                  const t = setTimeout(() => setShow(true), 200);
                  return () => clearTimeout(t);
            }
      }, []);

      // Measure actual banner height dynamically (handles mobile text-wrap)
      useEffect(() => {
            if (!show || !bannerRef.current) return;

            const updateHeight = () => {
                  if (bannerRef.current) {
                        onHeightChange(bannerRef.current.offsetHeight);
                  }
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
                        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-350 ${hiding ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
                              }`}
                  >
                        {/* Top glow line */}
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan to-transparent" />

                        <div
                              className="relative bg-background/95 backdrop-blur-md border-b border-cyan/30 shadow-[0_4px_20px_rgba(6,182,212,0.15)] cursor-pointer group"
                              onClick={() => setModalOpen(true)}
                        >
                              {/* Shimmer bg */}
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 via-transparent to-cyan/5 animate-pulse pointer-events-none" />

                              {/* Content — flex-wrap so it never overflows on mobile */}
                              <div className="relative px-4 py-2.5 pr-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 max-w-7xl mx-auto">
                                    {/* Pulsing bell */}
                                    <div className="relative flex-shrink-0">
                                          <div className="absolute inset-0 rounded-full bg-cyan/30 animate-ping" />
                                          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-cyan/20 border border-cyan/50">
                                                <Bell size={11} className="text-cyan" />
                                          </div>
                                    </div>

                                    {/* Badge — kept on all sizes for mobile clarity */}
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-orbitron font-bold tracking-widest uppercase flex-shrink-0 animate-pulse">
                                          Important
                                    </span>

                                    {/* Message */}
                                    <p className="text-xs sm:text-sm text-white/90 font-medium text-center leading-snug">
                                          <span className="text-cyan font-semibold">Technical issues</span> regarding payment &amp; presentation template have been{" "}
                                          <span className="text-green-400 font-semibold">resolved.</span>
                                    </p>

                                    {/* CTA */}
                                    <button
                                          onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
                                          id="notice-view-btn"
                                          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan/50 text-cyan text-[10px] font-orbitron font-bold tracking-wide hover:bg-cyan/20 group-hover:border-cyan transition-all duration-300 whitespace-nowrap"
                                    >
                                          <span>View Notice</span>
                                          <ChevronRight size={11} />
                                    </button>
                              </div>

                              {/* Dismiss — always absolute so it doesn't affect layout/height */}
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
                              {/* Backdrop */}
                              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                              {/* Modal card */}
                              <div
                                    className="relative w-full max-w-lg bg-[hsl(220,20%,6%)] border border-cyan/30 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-300"
                                    onClick={(e) => e.stopPropagation()}
                              >
                                    {/* Header */}
                                    <div className="relative px-6 py-4 border-b border-white/5 bg-gradient-to-r from-cyan/10 to-transparent">
                                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
                                          <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan/20 border border-cyan/40">
                                                      <AlertTriangle size={15} className="text-cyan" />
                                                </div>
                                                <div>
                                                      <h2 className="font-orbitron text-sm font-bold text-white tracking-wide">
                                                            Official Notice
                                                      </h2>
                                                      <p className="text-[10px] text-white/40 font-mono mt-0.5">
                                                            CodeCraze 3.0 &middot;{" "}
                                                            {new Date().toLocaleDateString("en-IN", {
                                                                  day: "2-digit",
                                                                  month: "short",
                                                                  year: "numeric",
                                                            })}
                                                      </p>
                                                </div>
                                                <span className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-900/50 border border-green-500/30 text-green-400 text-[9px] font-mono tracking-wider uppercase">
                                                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                                                      Resolved
                                                </span>
                                          </div>
                                    </div>

                                    {/* Body */}
                                    <div className="px-6 py-5 space-y-4">
                                          <p className="text-sm text-white/80 leading-relaxed">
                                                The technical issues regarding{" "}
                                                <span className="text-cyan font-semibold">payment processing</span> and the{" "}
                                                <span className="text-cyan font-semibold">presentation template</span> have now been
                                                successfully resolved.
                                          </p>

                                          <div className="space-y-3">
                                                <div className="flex items-start gap-3 p-3 rounded-xl bg-green-950/40 border border-green-800/40">
                                                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                                                      <p className="text-sm text-white/80 leading-snug">
                                                            Participants can now{" "}
                                                            <span className="text-green-400 font-medium">complete the payment process</span>{" "}
                                                            without any errors.
                                                      </p>
                                                </div>
                                                <div className="flex items-start gap-3 p-3 rounded-xl bg-green-950/40 border border-green-800/40">
                                                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                                                      <p className="text-sm text-white/80 leading-snug">
                                                            The{" "}
                                                            <span className="text-green-400 font-medium">updated presentation template</span>{" "}
                                                            is available and working properly.
                                                      </p>
                                                </div>
                                          </div>

                                          <div className="p-3 rounded-xl bg-cyan/5 border border-cyan/20">
                                                <p className="text-sm text-white/70 leading-relaxed">
                                                      You may now proceed with your{" "}
                                                      <span className="text-cyan font-semibold">registration and submission.</span>
                                                </p>
                                          </div>

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

                                          <p className="text-xs text-white/40 leading-relaxed border-t border-white/5 pt-3">
                                                ⚠️ If you still face any issues, please contact the organizing team immediately.
                                          </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] flex flex-wrap items-center justify-between gap-3">
                                          <div className="flex flex-wrap items-center gap-2">
                                                <a
                                                      href="https://docs.google.com/presentation/d/1clbR3_r71ku3rxmLdHmAFs6aZPqc2ogo/edit?slide=id.p1#slide=id.p1"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center gap-2 px-3 py-2 rounded-full border border-cyan/40 bg-cyan/5 text-cyan text-xs font-orbitron font-bold hover:bg-cyan/20 transition-all duration-200"
                                                >
                                                      <span>View PPT</span>
                                                      <ExternalLink size={11} />
                                                </a>
                                                {/* <a
                                                      href={WHATSAPP_LINK}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center gap-2 px-3 py-2 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-xs font-orbitron font-bold hover:bg-green-500/20 transition-all duration-200"
                                                >
                                                      <MessageCircle size={11} />
                                                      <span>WhatsApp</span>
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
