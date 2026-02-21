import { Trophy, Medal, Award } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Counter = ({ end, duration = 2000, prefix = "", suffix = "" }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const prizes = [
  {
    place: "1st Prize",
    label: "Grand Prize",
    amount: 10000,
    icon: Trophy,
    color: "orange",
    size: "large",
  },
  {
    place: "2nd Prize",
    label: "Runner Up",
    amount: 7000,
    icon: Medal,
    color: "cyan",
    size: "medium",
  },
  {
    place: "3rd Prize",
    label: "Second Runner Up",
    amount: 5000,
    icon: Award,
    color: "purple",
    size: "medium",
  },
];

const PrizeSection = () => {
  return (
    <section id="prizes" className="py-24 px-4 sm:px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mono text-xs text-cyan tracking-widest mb-3"></div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Total Prize Pool
          </h2>
          <div className="font-orbitron text-5xl sm:text-6xl font-black text-gradient-cyan mb-4">
            <Counter end={22000} prefix="₹" suffix="+" />
          </div>
          <p className="text-muted-foreground">Real rewards for real ideas. Industry recognition awaits the champions.</p>
        </div>

        {/* Prize cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {prizes.map((prize, i) => {
            const Icon = prize.icon;
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

            return (
              <div
                key={prize.place}
                className={`relative p-6 sm:p-8 rounded-xl transition-all duration-300 ${glowClass} ${i === 0 ? "md:-mt-4" : ""} text-center`}
              >
                {i === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange/20 border border-orange/40 mono text-xs text-orange">
                    TOP PRIZE
                  </div>
                )}
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto mb-6 ${colorClass}`}>
                  <Icon size={28} />
                </div>
                <div className="mono text-xs text-muted-foreground mb-2 tracking-widest">{prize.label.toUpperCase()}</div>
                <div className={`font-orbitron text-lg font-bold mb-4 ${prize.color === "orange" ? "text-orange" : prize.color === "cyan" ? "text-cyan" : "text-purple"}`}>
                  {prize.place}
                </div>
                <div className="font-orbitron text-3xl sm:text-4xl font-black text-foreground">
                  <Counter end={prize.amount} prefix="₹" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrizeSection;
