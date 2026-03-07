import { Trophy, Medal, Award, Users, School, X, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const winners = [
    {
        rank: "1st Place",
        teamName: "TinyCOders",
        college: "KCE's College of Engineering and Management, Jalgaon",
        members: ["Tushar Bharambe", "Pankaj Gadhari", "Vaibhav Sonar", "Rohit Shewale"],
        image: "/winners/first prize.jpeg",
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
        image: "/winners/2 prize.jpeg",
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
        image: "/winners/3 prize.jpeg",
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
        image: "/winners/4th.jpeg",
        color: "purple",
        icon: Award,
        accent: "from-purple-500/20 to-purple-500/5",
        border: "border-purple-500/30",
        text: "text-purple-400",
        glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    },
];

type LightboxData = { image: string; teamName: string; rank: string } | null;

const WinnersSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [celebrating, setCelebrating] = useState(false);
    const [lightbox, setLightbox] = useState<LightboxData>(null);

    // Close lightbox on ESC key
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

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
        <>
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
                        style={{ width: "100%", height: "100%" }}
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

                                    {/* Winner Photo — click to open lightbox */}
                                    <div
                                        className="relative h-52 overflow-hidden bg-black cursor-zoom-in"
                                        onClick={() => setLightbox({ image: winner.image, teamName: winner.teamName, rank: winner.rank })}
                                    >
                                        <img
                                            src={winner.image}
                                            alt={`${winner.teamName} - ${winner.rank}`}
                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Bottom gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                        {/* Color tint */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${winner.accent} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                                        {/* Expand hint on hover */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                                                <Maximize2 size={12} />
                                                Click to expand
                                            </div>
                                        </div>
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
                                                    {winner.members.map((member) => (
                                                        <span key={member} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80">
                                                            {member}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Decorative glow */}
                                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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

            {/* ── Lightbox Modal ── */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
                    onClick={() => setLightbox(null)}
                    style={{ animation: "lbFadeIn 0.2s ease both" }}
                >
                    {/* Blurred dark backdrop */}
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

                    {/* Modal card */}
                    <div
                        className="relative z-10 max-w-4xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
                        onClick={(e) => e.stopPropagation()}
                        style={{ animation: "lbScaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both" }}
                    >
                        {/* Full image */}
                        <img
                            src={lightbox.image}
                            alt={lightbox.teamName}
                            className="w-full max-h-[80vh] object-contain bg-black"
                        />

                        {/* Caption bar */}
                        <div className="px-6 py-4 bg-[#0a0a0f] border-t border-white/10 flex items-center justify-between">
                            <div>
                                <p className="text-white font-bold font-orbitron">{lightbox.teamName}</p>
                                <p className="text-xs text-muted-foreground mono tracking-widest uppercase">{lightbox.rank}</p>
                            </div>
                            <button
                                onClick={() => setLightbox(null)}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-all duration-200"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes lbFadeIn  { from { opacity: 0 } to { opacity: 1 } }
                @keyframes lbScaleIn { from { opacity: 0; transform: scale(0.88) } to { opacity: 1; transform: scale(1) } }
            `}</style>
        </>
    );
};

export default WinnersSection;
