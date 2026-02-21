import { GraduationCap, Lightbulb, Handshake } from "lucide-react";

const OrganizersSection = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mono text-xs text-cyan tracking-widest mb-3"></div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            About the <span className="text-gradient-cyan">Organizers</span>
          </h2>
        </div>

        {/* Organized by cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              org: "R. C. Patel Institute of Technology, Shirpur",
              label: "Organized By",
              badge: "Premier Autonomous Institution",
              color: "cyan",
            },
            {
              org: "Fetch AI Club",
              label: "Managed By",
              badge: "Student Club",
              color: "purple",
            },
          ].map((item) => (
            <div
              key={item.org}
              className={`p-6 rounded-xl ${item.color === "cyan" ? "card-glow" : "card-glow-purple"}`}
            >
              <div className={`mono text-xs mb-2 ${item.color === "cyan" ? "text-cyan" : "text-purple"} tracking-widest`}>
                {item.label.toUpperCase()}
              </div>
              <h3 className="font-orbitron text-xl font-bold text-foreground mb-2">{item.org}</h3>
              <span className={`inline-block text-xs px-3 py-1 rounded-full border mono ${item.color === "cyan" ? "border-cyan/30 text-cyan bg-cyan/10" : "border-purple/30 text-purple bg-purple/10"}`}>
                {item.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="p-5 sm:p-8 rounded-xl card-glow mb-10">
          <p className="text-foreground/80 leading-relaxed text-base sm:text-lg">
            <span className="text-cyan font-semibold">R. C. Patel Institute of Technology, Shirpur</span> is a premier autonomous institution committed to academic excellence, innovation, and industry-ready education. Through initiatives like CodeCraze 3.0, the institute actively promotes hands-on learning, problem-solving, and entrepreneurial thinking among students.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            CodeCraze 3.0 is a national-level hackathon managed by the <span className="text-purple-400 font-semibold">Fetch AI Club</span>. Participants form teams to ideate, prototype, and present innovative solutions across multiple domains within a thrilling 24-hour window.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { icon: GraduationCap, label: "Autonomous Institution" },
            { icon: Lightbulb, label: "Innovation-Focused" },
            { icon: Handshake, label: "Industry-Ready Education" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-cyan/20 bg-cyan/5"
            >
              <Icon size={16} className="text-cyan" />
              <span className="text-sm text-foreground/80">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizersSection;
