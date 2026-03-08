import { Trophy, Medal, Award, Users, School, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const winners = [
    {
        rank: "1st Place",
        teamName: "TinyCOders",
        college: "KCE's College of Engineering and Management, Jalgaon",
        members: ["Tushar Bharambe", "Pankaj Gadhari", "Vaibhav Sonar", "Rohit Shewale"],
        color: "orange",
        icon: Trophy,
        accent: "from-orange-500/20 to-orange-500/5",
        border: "border-orange-500/30",
        text: "text-orange-400",
        glow: "shadow-[0_0_30px_rgba(249,115,22,0.2)]",
    },
    {
        rank: "2nd Place",
        teamName: "OG's",
        college: "RC Patel Polytechnic College, Shirpur",
        members: ["Gaurav Chavhan", "Aaditya Borse", "Chetan Gujar", "Devendra Borse"],
        color: "cyan",
        icon: Medal,
        accent: "from-cyan-500/20 to-cyan-500/5",
        border: "border-cyan-500/30",
        text: "text-cyan-400",
        glow: "shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    },
    {
        rank: "3rd Place",
        teamName: "3 idiots",
        college: "RC Patel Institute Of Technology, Shirpur",
        members: ["Bhupesh Patil", "Ojaswini Borse", "Priyanshu Patil"],
        color: "purple",
        icon: Award,
        accent: "from-purple-500/20 to-purple-500/5",
        border: "border-purple-500/30",
        text: "text-purple-400",
        glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    },
    {
        rank: "Appreciation",
        teamName: "TechCreators",
        college: "RC Patel Institute Of Technology, Shirpur",
        members: ["Kunal Patil", "Utkarsh Narkhede", "Gunjan Bhamare", "Vrushali Wadile"],
        color: "purple",
        icon: Award,
        accent: "from-purple-500/20 to-purple-500/5",
        border: "border-purple-500/30",
        text: "text-purple-400",
        glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    },
];

const WinnersSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [celebrating, setCelebrating] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCelebrating(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!celebrating || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: any[] = [];
        const colors = ["#06b6d4", "#a855f7", "#f97316", "#ffffff", "#22c55e"];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 8 + 4,
                speed: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                angle: Math.random() * 6.28,
                spin: Math.random() * 0.2 - 0.1,
            });
        }

        let animationFrame: number;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.y += p.speed;
                p.angle += p.spin;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();

                if (p.y > canvas.height) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }
            });

            animationFrame = requestAnimationFrame(render);
        };

        render();

        // Stop after 8 seconds to save resources
        const timer = setTimeout(() => {
            cancelAnimationFrame(animationFrame);
            setCelebrating(false);
        }, 8000);

        return () => {
            cancelAnimationFrame(animationFrame);
            clearTimeout(timer);
        };
    }, [celebrating]);

    return (
        <section
            id="winners"
            ref={sectionRef}
            className="py-24 px-4 sm:px-6 relative overflow-hidden"
        >
            {/* Confetti Canvas */}
            {celebrating && (
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none z-50 transition-opacity duration-1000"
                    style={{ width: '100%', height: '100%' }}
                />
            )}

            <div className="section-divider mb-24" />

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none opacity-20" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="mono text-xs text-cyan tracking-widest mb-3 uppercase flex items-center justify-center gap-2">
                        <Trophy size={14} className="text-orange-400" />
                        Champions of CodeCraze 3.0
                        <Trophy size={14} className="text-orange-400" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
                        Meet the <span className="text-gradient-cyan">Winners</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        After 24 hours of intense coding, these teams rose to the top with their innovation,
                        dedication, and technical brilliance.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {winners.map((winner, idx) => {
                        const Icon = winner.icon;
                        return (
                            <div
                                key={winner.rank}
                                className={`group relative rounded-2xl border ${winner.border} bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${idx === 0 ? "lg:-mt-6 lg:scale-105" : ""} ${winner.glow}`}
                            >
                                {/* Ranking Badge */}
                                <div className={`absolute top-3 right-3 z-20 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border ${winner.border} flex items-center gap-1.5`}>
                                    <Icon size={12} className={winner.text} />
                                    <span className={`mono text-[9px] font-bold tracking-tighter ${winner.text}`}>
                                        {winner.rank.toUpperCase()}
                                    </span>
                                </div>

                                {/* Decorative rank placeholder (REPLACED IMAGE) */}
                                <div className="relative h-40 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
                                    <div className={`absolute inset-0 bg-gradient-to-t ${winner.accent} to-transparent opacity-40 group-hover:opacity-60 transition-opacity`} />

                                    {/* Large Stylized Rank Icon */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className={`p-4 rounded-full bg-black/40 border ${winner.border} mb-2 group-hover:scale-110 transition-transform duration-500`}>
                                            <Icon size={40} className={winner.text} />
                                        </div>
                                        <span className={`font-orbitron text-xl font-black tracking-widest ${winner.text} opacity-80`}>
                                            {winner.rank.split(' ')[0]}
                                        </span>
                                    </div>

                                    {/* Decorative background Icon */}
                                    <Icon size={120} className={`absolute -bottom-6 -left-6 opacity-[0.05] -rotate-12 ${winner.text}`} />
                                    <Icon size={80} className={`absolute -top-4 -right-4 opacity-[0.03] rotate-12 ${winner.text}`} />
                                </div>

                                {/* Team Info */}
                                <div className="p-6 relative">
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold font-orbitron text-white group-hover:text-cyan transition-colors">
                                            {winner.teamName}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                                            <School size={14} className="text-cyan/60" />
                                            <span>{winner.college}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2 text-xs font-bold mono text-cyan/40 uppercase tracking-widest">
                                                <Users size={12} />
                                                Team Members
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {winner.members.map(member => (
                                                    <span key={member} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80">
                                                        {member}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative glow */}
                                    <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-cyan/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Closing remark */}
                <div className="mt-20 text-center">
                    <p className="mono text-[10px] text-muted-foreground/40 tracking-[0.3em] uppercase">
                        Congratulations to all participants for making CodeCraze 3.0 a massive success!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WinnersSection;
