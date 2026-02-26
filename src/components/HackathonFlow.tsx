import { Upload, Code2, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const rounds = [
  {
    num: "01",
    label: "Round 1",
    title: "Online Idea Submission",
    icon: Upload,
    color: "cyan",
    steps: [
      "Choose one domain problem statement",
      "Submit Idea PPT",
      "Submit Idea Submission Document",
      "Strictly use official templates",
      "Top 40 teams shortlisted",
    ],
    details: {
      description: "Round 1 focuses on the conceptualization and feasibility of your idea. Teams must select a problem statement from the provided domains and submit their proposed solution.",
      content: [
        "Select a problem statement from the available domains.",
        "Prepare a presentation (PPT) outlining your idea, approach, and tech stack.",
        "Complete the Idea Submission Document with detailed technical specifications.",
        "Ensure all submissions follow the strict template guidelines provided.",
        "Submissions will be evaluated based on innovation, feasibility, and clarity.",
      ],
    },
  },
  {
    num: "02",
    label: "Round 2",
    title: "24-Hour On-Ground Hackathon",
    icon: Code2,
    color: "purple",
    steps: [
      "Problem statements revealed on ground",
      "24 hours continuous development",
      "No pre-built code or projects allowed",
      "AI tools allowed with disclosure",
      "Working prototype mandatory",
    ],
    details: {
      description: "The main event! A grueling 60-hour coding marathon where teams build their solutions from scratch.",
      timeline: [
        { time: "08:00 AM", activity: "Reporting, Verification & Desk Allotment" },
        { time: "10:00 AM", activity: "Development Session 1 Begins" },
        { time: "04:00 PM", activity: "Evening Snacks Break" },
        { time: "04:30 PM", activity: "Development Session 2 Begins" },
        { time: "08:00 PM", activity: "Night Meal & Entertainment Break" },
        { time: "10:00 PM", activity: "Mentoring & Progress Review" },
        { time: "11:00 PM", activity: "Development Session 3 Begins" },
        { time: "02:00 AM", activity: "Midnight Snacks & Coffee Break" },
        { time: "02:30 AM", activity: "Development Session 4 Begins" },
        { time: "06:30 AM", activity: "Morning Snacks" },
        { time: "07:00 AM", activity: "Final Development Sprint" },
        { time: "09:30 AM", activity: "Project Submission" },
        { time: "10:00 AM", activity: "Judging & Evaluation" },
        { time: "11:30 AM", activity: "Winner Announcement 🏆" },
      ],
    },
  },
  {
    num: "03",
    label: "Round 3",
    title: "Evaluation rounds",
    icon: Trophy,
    color: "orange",
    steps: [
      "Live prototype demonstration",
      "Time-bound final presentation",
      "Q&A with judges",
      "Top 3 teams declared winners",
    ],
    details: {
      description: "The final showdown where the top teams present their working prototypes to a panel of expert judges.",
      criteria: [
        "Innovation & Originality (20%)",
        "Technical Complexity & Implementation (30%)",
        "UI/UX Design (15%)",
        "Business Viability & Impact (15%)",
        "Presentation & Q&A (20%)",
      ],
    },
  },
];

const HackathonFlow = () => {
  return (
    <section id="flow" className="py-24 px-4 sm:px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mono text-xs text-cyan tracking-widest mb-3"></div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            The <span className="text-gradient-cyan">Journey</span>
          </h2>
          <p className="text-muted-foreground">From ideation to implementation — your path to glory</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-cyan/0 via-cyan/30 to-orange/30 z-0" />

          <div className="grid lg:grid-cols-3 gap-8">
            {rounds.map((round) => {
              const Icon = round.icon;
              const colorMap = {
                cyan: {
                  text: "text-cyan",
                  border: "border-cyan/30",
                  bg: "bg-cyan/10",
                  glow: "card-glow",
                  badge: "border-cyan/30 bg-cyan/5 text-cyan",
                  btn: "border-cyan/50 bg-cyan/5 text-cyan hover:bg-cyan/20",
                },
                purple: {
                  text: "text-purple",
                  border: "border-purple/30",
                  bg: "bg-purple/10",
                  glow: "card-glow-purple",
                  badge: "border-purple/30 bg-purple/5 text-purple",
                  btn: "border-purple/50 bg-purple/5 text-purple hover:bg-purple/20",
                },
                orange: {
                  text: "text-orange",
                  border: "border-orange/30",
                  bg: "bg-orange/10",
                  glow: "card-glow-orange",
                  badge: "border-orange/30 bg-orange/5 text-orange",
                  btn: "border-orange/50 bg-orange/5 text-orange hover:bg-orange/20",
                },
              };
              const c = colorMap[round.color as keyof typeof colorMap];

              return (
                <div key={round.num} className={`relative p-7 rounded-xl ${c.glow} flex flex-col h-full`}>
                  {/* Round badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mono text-xs mb-5 w-fit ${c.badge}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${c.text.replace("text-", "bg-")}`} style={{ background: round.color === "cyan" ? "hsl(var(--cyan))" : round.color === "purple" ? "hsl(var(--purple))" : "hsl(var(--orange))" }} />
                    {round.label.toUpperCase()}
                    {round.num === "01" && (
                      <span className="flex items-center gap-1.5 ml-2 border-l border-white/20 pl-2 text-[10px] animate-pulse font-bold tracking-wider">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan/50 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
                        </span>
                        LIVE NOW
                      </span>
                    )}
                  </div>

                  {/* Icon + number */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-xl border flex items-center justify-center ${c.border} ${c.bg} ${c.text}`}>
                      <Icon size={24} />
                    </div>
                    <div className={`font-orbitron text-4xl font-black opacity-20 ${c.text}`}>{round.num}</div>
                  </div>

                  <h3 className="font-orbitron text-lg font-bold text-foreground mb-4">{round.title}</h3>

                  <ul className="space-y-2 mb-6 flex-grow">
                    {round.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.text.replace("text-", "bg-")}`} style={{ background: round.color === "cyan" ? "hsl(var(--cyan))" : round.color === "purple" ? "hsl(var(--purple))" : "hsl(var(--orange))" }} />
                        {step}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3">
                    {/* View Details Button (Dialog) */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className={`w-full px-4 py-2 rounded-lg border text-xs font-orbitron tracking-wide transition-all ${c.btn}`}>
                          View Details
                        </button>
                      </DialogTrigger>
                      <DialogContent className="border-cyan/20 bg-black/95 backdrop-blur-xl w-[95vw] max-w-2xl mx-auto">
                        <DialogHeader>
                          <DialogTitle className={`font-orbitron text-2xl font-bold ${c.text} mb-2`}>{round.title}</DialogTitle>
                          <DialogDescription className="text-muted-foreground text-base">
                            {round.details.description}
                          </DialogDescription>
                        </DialogHeader>

                        <ScrollArea className="max-h-[60vh] mt-4 pr-4">
                          {/* Round 1 Content */}
                          {round.details.content && (
                            <ul className="space-y-3">
                              {round.details.content.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.text.replace("text-", "bg-")}`} style={{ background: `hsl(var(--${round.color}))` }} />
                                  <span className="text-sm text-foreground/90">{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Round 2 Timeline */}
                          {round.details.timeline && (
                            <div className="space-y-0 relative border-l border-white/10 ml-3 my-2">
                              {round.details.timeline.map((item, idx) => (
                                <div key={idx} className="relative pl-8 pb-8 last:pb-0">
                                  <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-black ${c.text.replace("text-", "bg-")}`} style={{ background: `hsl(var(--${round.color}))` }} />
                                  <div className={`mono text-xs font-bold ${c.text} mb-1`}>{item.time}</div>
                                  <div className="text-sm text-foreground/90">{item.activity}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Round 3 Criteria */}
                          {round.details.criteria && (
                            <div className="grid gap-3">
                              {round.details.criteria.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                  <span className="text-sm text-foreground/90">{item.split('(')[0]}</span>
                                  <span className={`text-xs font-bold mono ${c.text}`}>{item.match(/\((.*?)\)/)?.[1]}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>

                    {/* Download Template Button (Only for Round 1) */}
                    {round.num === "01" && (
                      <a href="https://docs.google.com/presentation/d/10wtslG4Qg01Rno6OPg9gecfdJqavBr08/edit?usp=sharing&ouid=106649993752560187038&rtpof=true&sd=true" className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border border-cyan/50 bg-cyan/10 text-cyan hover:bg-cyan/20 transition-all font-orbitron text-xs font-bold tracking-wide group">
                        <span className="group-hover:translate-x-1 transition-transform inline-block">Download Template</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HackathonFlow;
