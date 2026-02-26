import { Users, Check, X } from "lucide-react";

const teamSizes = [1, 2, 3, 4];

const rules = [
  { text: "No Solo Participation — Collaboration is the key to breakthrough ideas", allowed: false },
  { text: "Minimum 2 Members — Every great innovation needs a collaborator", allowed: true },
  { text: "Maximum 4 Members — Small teams move fast and build faster", allowed: true },
  { text: "Cross-Discipline Welcome — Mix skills for maximum impact", allowed: true },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 px-4 sm:px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mono text-xs text-cyan tracking-widest mb-3"></div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Build Your <span className="text-gradient-cyan">Dream Team</span>
          </h2>
          <p className="text-muted-foreground text-lg">Solo coders write code. Teams build revolutions.</p>
          <p className="text-muted-foreground mt-2">Innovation is a team sport — bring your force.</p>
        </div>

        {/* Team size visual */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          {teamSizes.map((size) => {
            const isValid = size >= 2 && size <= 4;
            return (
              <div
                key={size}
                className={`flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-xl border transition-all duration-300 min-w-[70px] sm:min-w-0 ${isValid
                  ? "border-cyan/30 bg-cyan/5 hover:border-cyan/60"
                  : "border-destructive/30 bg-destructive/5"
                  }`}
              >
                <div className="flex gap-1 flex-wrap justify-center">
                  {Array.from({ length: size }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${isValid ? "border-cyan bg-cyan/20" : "border-destructive bg-destructive/20"
                        }`}
                    />
                  ))}
                </div>
                <span className={`font-orbitron text-xl sm:text-2xl font-black ${isValid ? "text-cyan" : "text-destructive"}`}>
                  {size}
                </span>
                <span className={`mono text-[10px] sm:text-xs text-center ${isValid ? "text-cyan/70" : "text-destructive/70"}`}>
                  {size === 1 ? "Not Allowed" : size === 2 ? "Minimum" : size === 4 ? "Maximum" : "Perfect"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Rules */}
        <div className="grid sm:grid-cols-2 gap-4">
          {rules.map((rule, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 ${rule.allowed ? "card-glow" : "border-destructive/20 bg-destructive/5"
                }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${rule.allowed
                  ? "border-cyan/40 bg-cyan/10 text-cyan"
                  : "border-destructive/40 bg-destructive/10 text-destructive"
                  }`}
              >
                {rule.allowed ? <Check size={14} /> : <X size={14} />}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">{rule.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
