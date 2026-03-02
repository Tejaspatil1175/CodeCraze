import { Rocket, Network, BookOpen, Star, FileText, Building } from "lucide-react";

const reasons = [
  { icon: Rocket, title: "Launch Your Ideas", desc: "Transform your concepts into working prototypes in just 60 hours" },
  { icon: Network, title: "Network & Connect", desc: "Meet like-minded innovators and industry professionals" },
  { icon: BookOpen, title: "Learn & Grow", desc: "Access mentorship from industry experts throughout the event" },
  { icon: Star, title: "Win Recognition", desc: "Get recognized for your talent and creativity at a national level" },
  { icon: FileText, title: "Build Your Portfolio", desc: "Add a prestigious hackathon experience to your resume" },
  { icon: Building, title: "Industry Exposure", desc: "Present to industry judges and potential recruiters" },
];

const round2Teams = [
  { srNo: 1, teamName: "NeuroCraft", teamLeader: "Priyal Mahajan" },
  { srNo: 2, teamName: "Team Parivartan", teamLeader: "Harshal Sham Paltse" },
  { srNo: 3, teamName: "The Innovators Boys", teamLeader: "Ritik Jagtap" },
  { srNo: 4, teamName: "Celestials", teamLeader: "Yash Tejraj Thorat" },
  { srNo: 5, teamName: "Hackstreet Squad", teamLeader: "Suyash Gaikwad" },
  { srNo: 6, teamName: "TinyCoders", teamLeader: "Tushar Bharambe" },
  { srNo: 7, teamName: "AGRO WARRIORS", teamLeader: "Yash Patil" },
  { srNo: 8, teamName: "Resolve360", teamLeader: "Pratik Gadhe" },
  { srNo: 9, teamName: "CodeBlooded", teamLeader: "Nikita Patil" },
  { srNo: 10, teamName: "Vardhana", teamLeader: "Prathmesh Jagdish Ahire" },
  { srNo: 11, teamName: "NanoTheCar", teamLeader: "Shrawani Chaudhari" },
  { srNo: 12, teamName: "Innovative hackers", teamLeader: "Nayana Patel" },
  { srNo: 13, teamName: "OG's", teamLeader: "Gaurav Chavhan" },
  { srNo: 14, teamName: "Ctrl + innovate", teamLeader: "Roshani Patil" },
  { srNo: 15, teamName: "Syntax squad", teamLeader: "Priya Patil" },
  { srNo: 16, teamName: "Four thinkers", teamLeader: "Ashwini Patil" },
  { srNo: 17, teamName: "TEAM TAN-V", teamLeader: "Niranjan Patil" },
  { srNo: 18, teamName: "Team Nova", teamLeader: "Kundan Jadhav" },
  { srNo: 19, teamName: "Explorers", teamLeader: "Pruthviraj Chaudhari" },
  { srNo: 20, teamName: "The Debuggers", teamLeader: "Aditya Mali" },
  { srNo: 21, teamName: "3 Idiots", teamLeader: "Bhupesh Jijabrao Patil" },
  { srNo: 22, teamName: "SamvadAI", teamLeader: "Anand Balapure" },
  { srNo: 23, teamName: "BrainZ", teamLeader: "Harshad More" },
  { srNo: 24, teamName: "Vertex", teamLeader: "Dnyaneshwar Temkar" },
  { srNo: 25, teamName: "Wizards of Dev", teamLeader: "Devesh More" },
  { srNo: 26, teamName: "Prime Quadrant", teamLeader: "Prathmesh Marathe" },
  { srNo: 27, teamName: "The Code Crushers", teamLeader: "Yash Tawade" },
  { srNo: 28, teamName: "The 4 Frontiers", teamLeader: "Nikhil Mahajan" },
  { srNo: 29, teamName: "ChaiBytes", teamLeader: "Aniruddha Landge" },
  { srNo: 30, teamName: "CodeCatalysts", teamLeader: "Jidnyasa Patil" },
  { srNo: 31, teamName: "SHE TRACK :Smart GPS Safety Earring", teamLeader: "Vaishnavi Marathe" },
  { srNo: 32, teamName: "Singularity", teamLeader: "Aditya Salunkhe" },
  { srNo: 33, teamName: "The Nighthawks", teamLeader: "Manas Kathoke" },
  { srNo: 34, teamName: "TechCreaters", teamLeader: "Kunal Sudhakar Patil" },
  { srNo: 35, teamName: "CareerNexus", teamLeader: "Nikita Rajput" },
  { srNo: 36, teamName: "Syntax Squad", teamLeader: "Vivek Mali" },
  { srNo: 37, teamName: "Tech_Exchangers", teamLeader: "Patil Bhushan Pravinbhai" },
  { srNo: 38, teamName: "Arise", teamLeader: "Deep Patil" },
  { srNo: 39, teamName: "MedIntel Squad", teamLeader: "Hitesh Chaudhari" },
  { srNo: 40, teamName: "Crazy Coders", teamLeader: "Isha Rane" },
];

const WhyParticipate = () => {
  return (
    <section id="why" className="py-24 px-4 sm:px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto">

        {/* ── Round 2 Evaluated Teams ── */}
        <div id="evaluated-teams" className="mb-24 scroll-mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/30 bg-cyan/10 text-cyan text-xs mono tracking-widest mb-4">
              🏆 SHORTLISTED
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3">
              Teams Evaluated for{" "}
              <span className="text-gradient-cyan">Round 2</span>
            </h2>
            <p className="text-muted-foreground text-sm">
              Congratulations to all the teams who made it to the second round!
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-cyan/5">
            {/* Table header */}
            <div
              className="grid grid-cols-[56px_1fr_1fr] px-5 py-3 text-xs mono tracking-widest text-cyan uppercase"
              style={{ background: "linear-gradient(90deg,rgba(0,200,255,.12),rgba(0,200,255,.04))" }}
            >
              <span>Sr.</span>
              <span>Team Name</span>
              <span>Team Leader</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {round2Teams.map(({ srNo, teamName, teamLeader }, idx) => (
                <div
                  key={srNo}
                  className={`grid grid-cols-[56px_1fr_1fr] px-5 py-3.5 text-sm transition-colors duration-200 hover:bg-cyan/5 ${idx % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                    }`}
                >
                  <span className="text-muted-foreground mono text-xs pt-0.5">{srNo}</span>
                  <span className="text-foreground font-medium">{teamName}</span>
                  <span className="text-muted-foreground">{teamLeader}</span>
                </div>
              ))}
            </div>

            {/* Footer badge */}
            <div className="text-center py-4 text-xs text-muted-foreground mono border-t border-white/10"
              style={{ background: "linear-gradient(90deg,rgba(0,200,255,.06),rgba(0,200,255,.02))" }}
            >
              Total — {round2Teams.length} Teams Selected
            </div>
          </div>
        </div>

        {/* ── More Than Just a Competition ── */}
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
