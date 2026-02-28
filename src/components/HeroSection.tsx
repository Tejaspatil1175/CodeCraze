import SpaceGame from "./SpaceGame";
import React, { useState, useEffect } from "react";
import { Lock, Timer } from "lucide-react";

// Registration opens at 3:00 PM IST on Feb 25, 2026
const OPEN_AT = new Date("2026-02-25T15:00:00+05:30");
// Registration closes at 12:00 PM IST on Mar 1, 2026
const CLOSE_AT = new Date("2026-03-01T12:00:00+05:30");

const useCountdown = () => {
  const [openTimeLeft, setOpenTimeLeft] = useState(() => Math.max(0, OPEN_AT.getTime() - Date.now()));
  const [closeTimeLeft, setCloseTimeLeft] = useState(() => Math.max(0, CLOSE_AT.getTime() - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setOpenTimeLeft(Math.max(0, OPEN_AT.getTime() - Date.now()));
      setCloseTimeLeft(Math.max(0, CLOSE_AT.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const isOpen = openTimeLeft === 0;
  const isClosed = closeTimeLeft === 0;

  // Format for pre-open countdown
  const h = Math.floor(openTimeLeft / 3600000);
  const m = Math.floor((openTimeLeft % 3600000) / 60000);
  const s = Math.floor((openTimeLeft % 60000) / 1000);
  const fmt = (n: number) => String(n).padStart(2, "0");

  // Format for closing countdown
  const cd = closeTimeLeft;
  const days = Math.floor(cd / 86400000);
  const hours = Math.floor((cd % 86400000) / 3600000);
  const mins = Math.floor((cd % 3600000) / 60000);
  const secs = Math.floor((cd % 60000) / 1000);

  return {
    isOpen,
    isClosed,
    display: `${fmt(h)}:${fmt(m)}:${fmt(s)}`,
    closeDisplay: { days, hours, mins, secs, fmt },
  };
};

const HeroSection = () => {
  const { isOpen, isClosed, display, closeDisplay } = useCountdown();
  return (
    <section
      id="home"
      className="relative min-h-screen lg:min-h-[90vh] flex items-center pt-24 pb-10 lg:pt-28 lg:pb-8 overflow-hidden"
    >

      {/* Mobile-Only Decorative Background Elements */}
      <div className="absolute inset-0 z-0 lg:hidden overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-cyan/10 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[250px] h-[250px] bg-purple/10 rounded-full blur-[80px] animate-pulse delay-700" />

        {/* Floating Particles for mobile richness */}
        <div className="absolute top-[15%] right-[10%] w-2 h-2 bg-cyan/40 rounded-full animate-bounce delay-100" />
        <div className="absolute top-[40%] left-[8%] w-1.5 h-1.5 bg-purple/40 rounded-full animate-bounce delay-300" />
        <div className="absolute bottom-[30%] left-[15%] w-2 h-2 bg-blue-500/30 rounded-full animate-bounce delay-500" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left Column: Text */}
        <div className="text-center lg:text-left animate-in slide-in-from-left-10 fade-in duration-700 flex flex-col items-center lg:items-start">

          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-6">
            <span className="h-px w-8 bg-cyan"></span>
          </div>

          <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.15] mb-4 sm:mb-6 tracking-tight">
            Discover the <br className="hidden sm:block" />
            <span className="text-gradient-multiverse relative inline-block px-2">
              secrets
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span> <br className="lg:hidden" /> of <br className="hidden lg:block" />
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">CodeCraze 3.0</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed mb-7 sm:mb-10 mx-auto lg:mx-0">
            Join us on this journey as we explore the concept of the Multiverse of Code.
            Ideate, Prototype, and Deploy in a thriller 24-hour window.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col items-center lg:items-start gap-3 w-full sm:w-auto">

            {/* Registration button */}
            {!isOpen ? (
              <div className="flex-1 sm:flex-none min-w-[220px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center gap-4 cursor-not-allowed opacity-70 relative overflow-hidden">
                {/* Scanline shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
                <img src="/unstop-logo.svg" alt="Unstop Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain opacity-40 grayscale" />
                <div className="flex flex-col items-start leading-none gap-1">
                  <div className="flex items-center gap-1.5">
                    <Lock size={12} className="text-white/40" />
                    <span className="text-sm font-orbitron font-bold text-white/40 uppercase tracking-widest">Registration Locked</span>
                  </div>
                  <span className="font-orbitron text-lg font-black text-white/60 tabular-nums tracking-wider">{display}</span>
                  <span className="mono text-[10px] text-white/30 tracking-widest">OPENS TODAY AT 3:00 PM</span>
                </div>
              </div>
            ) : isClosed ? (
              <div className="flex-1 sm:flex-none min-w-[220px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-black/40 backdrop-blur-md border border-red-500/30 flex items-center justify-center gap-4 cursor-not-allowed opacity-60">
                <img src="/unstop-logo.svg" alt="Unstop Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain grayscale opacity-50" />
                <div className="flex flex-col items-start leading-none gap-1">
                  <div className="flex items-center gap-1.5">
                    <Lock size={12} className="text-red-400/60" />
                    <span className="text-sm font-orbitron font-bold text-red-400/60 uppercase tracking-widest">Registration Closed</span>
                  </div>
                  <span className="mono text-[10px] text-white/30 tracking-widest">1 MARCH · 12:00 PM IST</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-3 flex-wrap">
                <a
                  href="https://unstop.com/o/pL7F1yV?lb=CLkvmGT&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Deorepus8679"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-none px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-md border border-cyan/50 hover:border-cyan hover:bg-black/60 transition-all duration-300 flex items-center justify-center gap-4 group shadow-[0_0_25px_rgba(6,182,212,0.25)] animate-pulse-once"
                >
                  <img src="/unstop-logo.svg" alt="Unstop Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  <div className="flex flex-col items-start leading-none gap-1">
                    <span className="text-xl sm:text-2xl font-orbitron font-bold text-cyan">Register Now</span>
                    <span className="mono text-[10px] text-white/40 tracking-widest uppercase">via Unstop</span>
                  </div>
                </a>
                {/* Closing deadline badge — side of button */}
                <div className="flex flex-col items-start gap-1.5 px-4 py-3 rounded-xl bg-[#0d0505] border border-red-500/70 shadow-[0_0_18px_rgba(239,68,68,0.3)] backdrop-blur-sm">
                  {/* Label row */}
                  <div className="flex items-center gap-1.5">
                    <Timer size={11} className="text-red-400 animate-pulse flex-shrink-0" />
                    <span className="font-orbitron text-[9px] font-bold text-red-400 tracking-[0.15em] uppercase">Registration Closes In</span>
                  </div>
                  {/* Countdown digits */}
                  <div className="flex items-center gap-1.5">
                    {([
                      { val: closeDisplay.days, label: 'D' },
                      { val: closeDisplay.hours, label: 'H' },
                      { val: closeDisplay.mins, label: 'M' },
                      { val: closeDisplay.secs, label: 'S' },
                    ] as { val: number; label: string }[]).map(({ val, label }, i) => (
                      <React.Fragment key={label}>
                        {i > 0 && <span className="text-red-500/50 font-black text-sm mb-2">:</span>}
                        <div className="flex flex-col items-center bg-red-950/60 border border-red-500/30 rounded-md px-2 py-1 min-w-[32px]">
                          <span className="font-orbitron font-black text-red-300 tabular-nums text-sm leading-none">
                            {closeDisplay.fmt(val)}
                          </span>
                          <span className="mono text-[8px] text-red-400/60 tracking-widest uppercase leading-none mt-0.5">{label}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  {/* Deadline text */}
                  <span className="mono text-[9px] text-red-300/60 tracking-widest">1 MARCH 2026 · 12:00 PM IST</span>
                </div>
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="flex justify-center lg:justify-start gap-4 sm:gap-8 mt-8 sm:mt-10 pt-6 sm:pt-6 border-t border-white/5 w-full">
            <div className="px-2">
              <div className="font-orbitron text-xl sm:text-2xl font-bold text-orange-400">TBD</div>
              <div className="mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest text-cyan/70">Prize Pool</div>
            </div>
            <div className="h-8 w-px bg-white/5 self-center mx-1 sm:mx-0"></div>
            <div className="px-2">
              <div className="font-orbitron text-xl sm:text-2xl font-bold text-white">24h</div>
              <div className="mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest text-purple/70">Duration</div>
            </div>
            <div className="h-8 w-px bg-white/5 self-center mx-1 sm:mx-0"></div>
            <div className="px-2">
              <div className="font-orbitron text-xl sm:text-2xl font-bold text-white">40+</div>
              <div className="mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest text-orange-400/70">Teams</div>
            </div>
          </div>
        </div>

        {/* Right Column: Game */}
        <div className="relative hidden lg:flex lg:h-[560px] items-center justify-center animate-in slide-in-from-right-10 fade-in duration-1000 delay-200">

          {/* Abstract glow behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-gradient-to-tr from-cyan/20 to-purple/20 rounded-full blur-[80px]" />

          {/* Main Game with decorative polygon clip */}
          <div className="relative w-full h-full max-w-2xl mx-auto">
            <div
              className="w-full h-full bg-[#000814] rounded-2xl sm:rounded-3xl relative z-10 overflow-hidden border border-cyan/20 shadow-2xl shadow-cyan/10"
              style={{
                clipPath: "polygon(12% 0%, 100% 0, 100% 85%, 88% 100%, 0 100%, 0% 15%)"
              }}
            >
              <SpaceGame />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent mix-blend-overlay pointer-events-none" />
            </div>

            {/* Decorative border outline */}
            <div
              className="absolute -inset-3 sm:-inset-4 border border-cyan/30 z-0 animate-pulse"
              style={{
                clipPath: "polygon(12% 0%, 100% 0, 100% 85%, 88% 100%, 0 100%, 0% 15%)"
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
