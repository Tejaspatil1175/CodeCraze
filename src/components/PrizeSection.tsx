import { Trophy, Medal, Award } from "lucide-react";

const PrizeSection = () => {
  return (
    <section id="prizes" className="py-24 px-4 sm:px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="mono text-xs text-cyan-400 tracking-widest mb-3 uppercase">Rewards</div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Prize <span className="text-gradient-cyan">Pool</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Top teams take home real cash prizes. Build something brilliant and claim your reward.
          </p>
        </div>

        {/* Prize cards */}
        <div className="grid md:grid-cols-3 gap-6 items-end">

          {/* ── 1st Prize ── */}
          <div className="relative p-6 sm:p-8 rounded-xl text-center select-none md:-mt-6 md:scale-105 border border-orange-500/30 bg-white/[0.02] shadow-[0_0_40px_rgba(249,115,22,0.15)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_60px_rgba(249,115,22,0.25)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 mono text-xs text-orange-400 whitespace-nowrap">
              TOP PRIZE
            </div>
            <div className="w-16 h-16 rounded-full border border-orange-500/30 bg-orange-500/10 flex items-center justify-center mx-auto mb-5">
              <Trophy size={28} className="text-orange-400" />
            </div>
            <div className="mono text-xs text-muted-foreground mb-1 tracking-widest">GRAND PRIZE</div>
            <div className="font-orbitron text-lg font-bold mb-5 text-orange-400">1st Prize</div>
            <div className="font-orbitron text-5xl sm:text-6xl font-black mb-1" style={{ background: "linear-gradient(135deg, #fb923c, #facc15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ₹5,000
            </div>
            <div className="mono text-[10px] text-muted-foreground/50 tracking-widest uppercase">Cash Prize</div>
            <div className="absolute inset-0 rounded-xl pointer-events-none opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)" }} />
          </div>

          {/* ── 2nd Prize ── */}
          <div className="relative p-6 sm:p-8 rounded-xl text-center select-none border border-cyan-500/30 bg-white/[0.02] shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_60px_rgba(6,182,212,0.25)]">
            <div className="w-16 h-16 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center mx-auto mb-5">
              <Medal size={28} className="text-cyan-400" />
            </div>
            <div className="mono text-xs text-muted-foreground mb-1 tracking-widest">RUNNER UP</div>
            <div className="font-orbitron text-lg font-bold mb-5 text-cyan-400">2nd Prize</div>
            <div className="font-orbitron text-5xl sm:text-6xl font-black mb-1" style={{ background: "linear-gradient(135deg, #22d3ee, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ₹3,000
            </div>
            <div className="mono text-[10px] text-muted-foreground/50 tracking-widest uppercase">Cash Prize</div>
            <div className="absolute inset-0 rounded-xl pointer-events-none opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)" }} />
          </div>

          {/* ── 3rd Prize ── */}
          <div className="relative p-6 sm:p-8 rounded-xl text-center select-none border border-purple-500/30 bg-white/[0.02] shadow-[0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_60px_rgba(168,85,247,0.25)]">
            <div className="w-16 h-16 rounded-full border border-purple-500/30 bg-purple-500/10 flex items-center justify-center mx-auto mb-5">
              <Award size={28} className="text-purple-400" />
            </div>
            <div className="mono text-xs text-muted-foreground mb-1 tracking-widest">SECOND RUNNER UP</div>
            <div className="font-orbitron text-lg font-bold mb-5 text-purple-400">3rd Prize</div>
            <div className="font-orbitron text-5xl sm:text-6xl font-black mb-1" style={{ background: "linear-gradient(135deg, #c084fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ₹2,000
            </div>
            <div className="mono text-[10px] text-muted-foreground/50 tracking-widest uppercase">Cash Prize</div>
            <div className="absolute inset-0 rounded-xl pointer-events-none opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)" }} />
          </div>

        </div>

        {/* Bottom note */}
        <p className="text-center mono text-xs text-muted-foreground/50 mt-12 tracking-widest">
          PRIZES AWARDED TO TOP 3 TEAMS · CODECRAZE 3.0
        </p>

      </div>
    </section>
  );
};

export default PrizeSection;
