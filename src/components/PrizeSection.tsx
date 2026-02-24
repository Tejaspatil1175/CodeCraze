import { Trophy, Medal, Award, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const prizes = [
  {
    place: "1st Prize",
    label: "Grand Prize",
    icon: Trophy,
    color: "orange",
  },
  {
    place: "2nd Prize",
    label: "Runner Up",
    icon: Medal,
    color: "cyan",
  },
  {
    place: "3rd Prize",
    label: "Second Runner Up",
    icon: Award,
    color: "purple",
  },
];

const CHARS = "₹0123456789?!#@%*";

const ScrambleText = ({ running }: { running: boolean }) => {
  const [display, setDisplay] = useState("?????");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setDisplay(
          Array.from({ length: 5 }, () =>
            CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join("")
        );
      }, 80);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplay("?????");
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  return <span>{display}</span>;
};

const PrizeSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="prizes" className="py-24 px-4 sm:px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="mono text-xs text-cyan tracking-widest mb-3 uppercase">Rewards</div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Prize <span className="text-gradient-cyan">Pool</span>
          </h2>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-orange/40 bg-orange/10 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-400"></span>
            </span>
            <span className="mono text-xs text-orange-400 font-bold tracking-widest uppercase">Prizes Being Finalized — Stay Tuned</span>
          </div>

          <p className="text-muted-foreground mt-2">
            Exciting prizes await. The full announcement is coming very soon.
          </p>
        </div>

        {/* Prize cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {prizes.map((prize, i) => {
            const Icon = prize.icon;
            const isHovered = hoveredIdx === i;
            const colorClass =
              prize.color === "orange"
                ? "text-orange border-orange/30 bg-orange/10"
                : prize.color === "cyan"
                  ? "text-cyan border-cyan/30 bg-cyan/10"
                  : "text-purple border-purple/30 bg-purple/10";
            const glowClass =
              prize.color === "orange"
                ? "card-glow-orange"
                : prize.color === "cyan"
                  ? "card-glow"
                  : "card-glow-purple";
            const textColor =
              prize.color === "orange" ? "text-orange" : prize.color === "cyan" ? "text-cyan" : "text-purple";

            return (
              <div
                key={prize.place}
                className={`relative p-6 sm:p-8 rounded-xl transition-all duration-300 ${glowClass} ${i === 0 ? "md:-mt-4" : ""} text-center cursor-default select-none`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {i === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange/20 border border-orange/40 mono text-xs text-orange">
                    TOP PRIZE
                  </div>
                )}

                <div className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto mb-6 ${colorClass}`}>
                  <Icon size={28} />
                </div>

                <div className="mono text-xs text-muted-foreground mb-2 tracking-widest">
                  {prize.label.toUpperCase()}
                </div>

                <div className={`font-orbitron text-lg font-bold mb-6 ${textColor}`}>
                  {prize.place}
                </div>

                {/* Locked amount */}
                <div className="relative flex flex-col items-center gap-2">
                  <div className={`font-orbitron text-3xl sm:text-4xl font-black ${isHovered ? textColor : "text-foreground/30"} transition-colors duration-200`}>
                    <ScrambleText running={isHovered} />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Lock size={13} className="text-muted-foreground/50" />
                    <span className="mono text-[10px] text-muted-foreground/50 tracking-widest uppercase">
                      {isHovered ? "Decrypting..." : "Amount Locked"}
                    </span>
                  </div>
                </div>

                {/* Subtle scanline overlay */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom hint */}
        <p className="text-center mono text-xs text-muted-foreground/50 mt-10 tracking-widest">
          HOVER CARDS TO DECRYPT · FULL REVEAL COMING SOON
        </p>

      </div>
    </section>
  );
};

export default PrizeSection;
