import { Landmark, Stethoscope, Leaf, Factory, Wheat } from "lucide-react";

const domains = [
  {
    icon: Landmark,
    name: "Fintech",
    desc: "Innovative financial technologies, digital banking solutions, secure payment systems, and financial inclusion strategies.",
    color: "cyan",
  },
  {
    icon: Stethoscope,
    name: "Health Tech",
    desc: "Technology-driven healthcare solutions, telemedicine, patient monitoring, and digital health records.",
    color: "purple",
  },
  {
    icon: Leaf,
    name: "Sustainability",
    desc: "Green technologies, renewable energy, waste management, and eco-friendly innovations for a better future.",
    color: "cyan",
  },
  {
    icon: Factory,
    name: "Industrial Automation",
    desc: "Smart manufacturing, IoT in industry, automated workflows, and efficiency improvements for factories.",
    color: "purple",
  },
  {
    icon: Wheat,
    name: "Agritech",
    desc: "Smart farming solutions, crop monitoring, precision agriculture, and supply chain optimization for farmers.",
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
