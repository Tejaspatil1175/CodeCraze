import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Who can participate?",
    a: "Any student from any recognized college or university can participate. The event is open to students from all branches and disciplines.",
  },
  {
    q: "What is the team size?",
    a: "Teams must have a minimum of 2 and a maximum of 4 members. Solo participation is not allowed. Cross-disciplinary teams are highly encouraged.",
  },
  {
    q: "Are Round 1 and Round 2 problem statements the same?",
    a: "No. Round 1 uses pre-defined problem statements from the given domains. Round 2 problem statements are entirely new and revealed only on the event day to ensure fair competition.",
  },
  {
    q: "Can we use pre-built code?",
    a: "No. Pre-built code or previously developed projects are strictly not allowed in Round 2. All solutions must be built from scratch during the 60-hour hackathon.",
  },
  {
    q: "Are AI tools allowed?",
    a: "Yes, AI tools are allowed in Round 2, but their usage must be disclosed to the judges. Transparency about AI assistance is mandatory.",
  },
  {
    q: "Will accommodation be provided?",
    a: "Details regarding accommodation will be communicated to shortlisted teams after Round 1 results are announced.",
  },
  {
    q: "Who owns the intellectual property?",
    a: "The intellectual property of all submitted projects remains with the respective teams. The organizers do not claim ownership over participant creations.",
  },
];

const FAQItem = ({ faq }: { faq: { q: string; a: string } }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border bg-black/20 backdrop-blur-sm transition-all duration-300 overflow-hidden ${open ? "border-cyan/40 shadow-[0_0_20px_hsl(var(--cyan)/0.1)]" : "border-white/10 hover:border-cyan/20"
        }`}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-foreground">{faq.q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-cyan transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div className="w-full h-px bg-white/10 mb-4" />
          <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mono text-xs text-cyan tracking-widest mb-3"></div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Got <span className="text-gradient-cyan">Questions?</span>
          </h2>
          <p className="text-muted-foreground">Frequently Asked Questions</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
