import { Rocket, Network, BookOpen, Star, FileText, Building } from "lucide-react";

const reasons = [
  { icon: Rocket, title: "Launch Your Ideas", desc: "Transform your concepts into working prototypes in just 60 hours" },
  { icon: Network, title: "Network & Connect", desc: "Meet like-minded innovators and industry professionals" },
  { icon: BookOpen, title: "Learn & Grow", desc: "Access mentorship from industry experts throughout the event" },
  { icon: Star, title: "Win Recognition", desc: "Get recognized for your talent and creativity at a national level" },
  { icon: FileText, title: "Build Your Portfolio", desc: "Add a prestigious hackathon experience to your resume" },
  { icon: Building, title: "Industry Exposure", desc: "Present to industry judges and potential recruiters" },
];

const WhyParticipate = () => {
  return (
    <section id="why" className="py-24 px-4 sm:px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mono text-xs text-cyan tracking-widest mb-3"></div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            More Than Just a <span className="text-gradient-cyan">Competition</span>
          </h2>
          <p className="text-muted-foreground">It's a launchpad for your tech career</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`p-6 rounded-xl card-glow group cursor-default`}
            >
              <div className="w-11 h-11 rounded-lg border border-cyan/30 bg-cyan/10 text-cyan flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-all duration-300">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyParticipate;
