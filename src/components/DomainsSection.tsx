import { Stethoscope, GraduationCap, Sprout, Building2, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const domains = [
  {
    icon: Stethoscope,
    name: "Health Care",
    desc: "Technology-driven healthcare solutions, telemedicine, patient monitoring, diagnostics, and accessible medical innovations.",
    color: "cyan",
    details: {
      description:
        "Build impactful digital health solutions that bridge the gap between patients and providers. Focus on scalability, accessibility, and real-world impact.",
      focusAreas: [
        "Telemedicine & Remote Consultations",
        "AI-powered Diagnostics & Early Detection",
        "Smart Medication & Treatment Management",
        "Hospital & Patient Data Management Systems",
        "Accessible Healthcare for Underprivileged Communities",
        "Mental Health & Wellness Platforms",
      ],
      criteria: [
        "Patient Impact & Real-world Feasibility (30%)",
        "Innovation & Originality (25%)",
        "Technical Implementation (25%)",
        "Scalability & Accessibility (20%)",
      ],
    },
  },
  {
    icon: GraduationCap,
    name: "EduTech",
    desc: "Smart learning platforms, personalized education, skill development tools, and tech-driven academic solutions.",
    color: "purple",
    details: {
      description:
        "Reimagine the future of education by creating tools that personalize learning, eliminate barriers, and empower every student — from rural classrooms to urban campuses.",
      focusAreas: [
        "Adaptive & Personalized Learning Systems",
        "Bridging Digital Divide in Rural Education",
        "AI Tutors & Intelligent Assessment Tools",
        "Gamification & Engagement-based Learning",
        "Skill Development & Vocational Training Platforms",
        "Secure & Fair Online Examination Systems",
      ],
      criteria: [
        "Learning Outcomes & Impact (30%)",
        "Accessibility Across Demographics (25%)",
        "Technical Innovation (25%)",
        "Scalability & Deployment Readiness (20%)",
      ],
    },
  },
  {
    icon: Sprout,
    name: "Agriculture",
    desc: "Smart farming, crop monitoring, precision agriculture, supply chain optimization, and agri-tech innovations for farmers.",
    color: "cyan",
    details: {
      description:
        "Empower India's farmers with cutting-edge technology. Build solutions that boost crop yields, reduce waste, improve supply chains, and bring data-driven decisions to the fields.",
      focusAreas: [
        "Precision Agriculture & IoT-based Crop Monitoring",
        "Drone & Satellite Imagery for Farm Analysis",
        "Weather Prediction & Climate Resilience Tools",
        "Farm Automation & Smart Equipment",
        "Agricultural Supply Chain & Market Linkage",
        "Smart Irrigation & Water Conservation",
      ],
      criteria: [
        "Farmer Usability & Adoption (30%)",
        "Tech Innovation & Novelty (25%)",
        "Rural Deployment Potential (25%)",
        "Environmental Impact (20%)",
      ],
    },
  },
  {
    icon: Building2,
    name: "Civic Tech",
    desc: "Digital governance, public service automation, smart city infrastructure, and citizen engagement platforms.",
    color: "purple",
    details: {
      description:
        "Use technology to transform how citizens interact with government, access public services, and participate in civic life. Build the infrastructure for smarter, more transparent cities.",
      focusAreas: [
        "E-Governance & Digital Public Service Portals",
        "Smart City Infrastructure & IoT Integration",
        "Transparent Voting & Civic Engagement Platforms",
        "Grievance Redressal & Public Feedback Systems",
        "Waste Management & Environmental Monitoring",
        "Traffic & Urban Mobility Optimization",
      ],
      criteria: [
        "Citizen Usability & Transparency (30%)",
        "Government Adoption Readiness (25%)",
        "Technical Implementation (25%)",
        "Scalability & Open Data Usage (20%)",
      ],
    },
  },
  {
    icon: ShieldCheck,
    name: "Women's Safety",
    desc: "Technology solutions for personal safety, emergency response, awareness platforms, and community protection for women.",
    color: "cyan",
    details: {
      description:
        "Create technology that actively protects, empowers, and supports women in everyday life. From real-time emergency alerts to community-driven safety networks — every idea counts.",
      focusAreas: [
        "Real-time SOS & Emergency Alert Systems",
        "Safe Route & Location Sharing Platforms",
        "Community Safety Networks & Reporting Tools",
        "Awareness & Education on Women's Rights",
        "Anti-Harassment Monitoring & Evidence Collection",
        "Women Empowerment & Self-Defense Resources",
      ],
      criteria: [
        "Real-world Safety Impact (30%)",
        "Ease of Use & Accessibility (25%)",
        "Community Reach & Awareness (25%)",
        "Survivor-Centered Design (20%)",
      ],
    },
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
          <p className="text-muted-foreground">
            Choose your domain and build something that matters
          </p>
        </div>

        {/* Domain cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain) => {
            const Icon = domain.icon;
            const isCyan = domain.color === "cyan";

            const colorMap = {
              cyan: {
                text: "text-cyan",
                border: "border-cyan/30",
                bg: "bg-cyan/10",
                glow: "card-glow",
                badge: "border-cyan/30 bg-cyan/5 text-cyan",
                btn: "border-cyan/50 bg-cyan/5 text-cyan hover:bg-cyan/20",
                dot: "hsl(var(--cyan))",
              },
              purple: {
                text: "text-purple",
                border: "border-purple/30",
                bg: "bg-purple/10",
                glow: "card-glow-purple",
                badge: "border-purple/30 bg-purple/5 text-purple",
                btn: "border-purple/50 bg-purple/5 text-purple hover:bg-purple/20",
                dot: "hsl(var(--purple))",
              },
            };

            const c = colorMap[domain.color as keyof typeof colorMap];

            return (
              <div
                key={domain.name}
                className={`relative p-6 rounded-xl ${c.glow} flex flex-col h-full`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 border transition-all duration-300 ${c.border} ${c.bg} ${c.text}`}
                >
                  <Icon size={22} />
                </div>

                <h3 className="font-orbitron text-lg font-bold text-foreground mb-3">
                  {domain.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {domain.desc}
                </p>

                {/* View More Dialog — same style as Journey's "View Details" */}
                <div className="mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className={`w-full px-4 py-2 rounded-lg border text-xs font-orbitron tracking-wide transition-all ${c.btn}`}
                      >
                        View More
                      </button>
                    </DialogTrigger>
                    <DialogContent className="border-cyan/20 bg-black/95 backdrop-blur-xl w-[95vw] max-w-2xl mx-auto">
                      <DialogHeader>
                        <DialogTitle
                          className={`font-orbitron text-2xl font-bold ${c.text} mb-2`}
                        >
                          {domain.name}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-base">
                          {domain.details.description}
                        </DialogDescription>
                      </DialogHeader>

                      <ScrollArea className="max-h-[60vh] mt-4 pr-4">
                        {/* Focus Areas */}
                        <div className="mb-6">
                          <div className={`mono text-xs tracking-widest mb-3 ${c.text}`}>
                            // KEY FOCUS AREAS
                          </div>
                          <ul className="space-y-3">
                            {domain.details.focusAreas.map((area, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                              >
                                <span
                                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: c.dot }}
                                />
                                <span className="text-sm text-foreground/90">{area}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Judging Criteria */}
                        <div>
                          <div className={`mono text-xs tracking-widest mb-3 ${c.text}`}>
                            // JUDGING CRITERIA
                          </div>
                          <div className="grid gap-3">
                            {domain.details.criteria.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                              >
                                <span className="text-sm text-foreground/90">
                                  {item.split("(")[0]}
                                </span>
                                <span className={`text-xs font-bold mono ${c.text}`}>
                                  {item.match(/\((.*?)\)/)?.[1]}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
