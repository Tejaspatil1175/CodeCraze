import { User, Phone, Mail } from "lucide-react";
import { useState } from "react";

const coordinators = [
      {
            name: "Vedika Girase",
            role: "Hackathon Coordinator",
            phone: "+91 9370273685",
            email: "vidhi7001@gmail.com",
            image: "/team/vedika.jpeg",
      },
      {
            name: "Dhiren Thakur",
            role: "Hackathon Coordinator",
            phone: "+91 7028023413",
            email: "thakurdhiren66@gmail.com",
            image: "/team/codinator 2 imag.jpeg",
      },
];

const CoordinatorCard = ({ member }: { member: typeof coordinators[0] }) => {
      const [imgError, setImgError] = useState(false);

      return (
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-cyan/20 hover:border-cyan/50 hover:bg-cyan/5 transition-all duration-300 group shadow-[0_0_20px_rgba(6,182,212,0.05)]">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-cyan/50 transition-colors">
                        {!imgError ? (
                              <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    onError={() => setImgError(true)}
                              />
                        ) : (
                              <User size={32} className="text-slate-500 group-hover:text-cyan transition-colors" />
                        )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                        <h3 className="font-orbitron font-bold text-lg text-foreground truncate group-hover:text-cyan transition-colors">
                              {member.name}
                        </h3>
                        <p className="mono text-xs text-cyan mb-3 uppercase tracking-wider">
                              {member.role}
                        </p>

                        <div className="flex flex-col gap-2">
                              <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
                                    <Phone size={14} />
                                    <span>{member.phone}</span>
                              </a>
                              <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
                                    <Mail size={14} />
                                    <span className="truncate">{member.email}</span>
                              </a>
                        </div>
                  </div>
            </div>
      );
};

const HackathonCoordinators = () => {
      return (
            <section className="py-20 px-4 sm:px-6 relative">
                  <div className="section-divider mb-16" />
                  <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                              <div className="mono text-xs text-cyan tracking-widest mb-3 uppercase">Event Leadership</div>
                              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
                                    Hackathon <span className="text-gradient-cyan">Coordinators</span>
                              </h2>
                              <p className="text-muted-foreground max-w-2xl mx-auto">
                                    The driving force behind CodeCraze 3.0. Reach out to them for event-specific queries.
                              </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
                              {coordinators.map((member, index) => (
                                    <CoordinatorCard key={index} member={member} />
                              ))}
                        </div>
                  </div>
            </section>
      );
};

export default HackathonCoordinators;
