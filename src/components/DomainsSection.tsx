import { Stethoscope, GraduationCap, Sprout, Building2, ShieldCheck } from "lucide-react";

const domains = [
  {
    icon: Stethoscope,
    name: "Health Care",
    desc: "Technology-driven healthcare solutions, telemedicine, patient monitoring, diagnostics, and accessible medical innovations.",
    color: "cyan",
  },
  {
    icon: GraduationCap,
    name: "EduTech",
    desc: "Smart learning platforms, personalized education, skill development tools, and tech-driven academic solutions.",
    color: "purple",
  },
  {
    icon: Sprout,
    name: "Agriculture",
    desc: "Smart farming, crop monitoring, precision agriculture, supply chain optimization, and agri-tech innovations for farmers.",
    color: "cyan",
  },
  {
    icon: Building2,
    name: "Civic Tech",
    desc: "Digital governance, public service automation, smart city infrastructure, and citizen engagement platforms.",
    color: "purple",
  },
  {
    icon: ShieldCheck,
    name: "Women's Safety",
    desc: "Technology solutions for personal safety, emergency response, awareness platforms, and community protection for women.",
    color: "cyan",
  },
];

const DomainsSection = () => {
  return (
    <section id="domains" className="py-24 px-4 sm:px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mono text-xs text-cyan tracking-widest mb-3"></div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Competition <span className="text-gradient-cyan">Domains</span>
          </h2>
        </div>

        {/* Domain cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, i) => {
            const Icon = domain.icon;
            const isCyan = domain.color === "cyan";
            return (
              <div
                key={domain.name}
                className={`p-6 rounded-xl transition-all duration-300 group cursor-default ${isCyan ? "card-glow" : "card-glow-purple"
                  }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 border transition-all duration-300 ${isCyan
                    ? "border-cyan/30 bg-cyan/10 text-cyan group-hover:bg-cyan/20"
                    : "border-purple/30 bg-purple/10 text-purple group-hover:bg-purple/20"
                    }`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-3">{domain.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{domain.desc}</p>
              </div>
            );
          })}

          {/* Info card */}
          {/* <div className="p-6 rounded-xl border border-white/10 bg-black/20 backdrop-blur-md flex flex-col justify-center">
            <div className="mono text-xs text-cyan tracking-widest mb-3">// NOTE</div>
            <p className="text-foreground/80 text-sm leading-relaxed">
              These are the official domains for Round 2. Problem statements will be provided by the organizers and revealed on the event day.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
