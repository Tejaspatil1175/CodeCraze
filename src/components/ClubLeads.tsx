import { User, Phone, Mail, Linkedin } from "lucide-react";

const ClubLeads = () => {
      const team = [
            {
                  name: "Vinit Bari",
                  role: "Club Head",
                  phone: "+91 0000000000",
                  email: "vinit.bari@example.com",
            },
            {
                  name: "Raj Sonavane",
                  role: "Club Co-Head",
                  phone: "+91 0000000000",
                  email: "raj.sonavane@example.com",
            },
            {
                  name: "Tech Lead Name",
                  role: "Technical Lead",
                  phone: "+91 0000000000",
                  email: "tech@example.com",
            },
            {
                  name: "Mgmt Lead Name",
                  role: "Management Lead",
                  phone: "+91 0000000000",
                  email: "management@example.com",
            },
            {
                  name: "Member Name",
                  role: "Core Member",
                  phone: "+91 0000000000",
                  email: "member1@example.com",
            },
            {
                  name: "Member Name",
                  role: "Core Member",
                  phone: "+91 0000000000",
                  email: "member2@example.com",
            },
      ];

      return (
            <section className="py-20 px-4 sm:px-6 relative">
                  <div className="section-divider mb-16" />
                  <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                              <div className="mono text-xs text-cyan tracking-widest mb-3">CONTACT US</div>
                              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
                                    Meet the <span className="text-gradient-cyan">Core Team</span>
                              </h2>
                              <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Have questions? Reach out to our student coordinators directly.
                              </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                              {team.map((member, index) => (
                                    <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300 group">
                                          {/* Avatar */}
                                          <div className="w-20 h-20 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-cyan/50 transition-colors">
                                                <User size={32} className="text-slate-500 group-hover:text-cyan transition-colors" />
                                                {/* <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> */}
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
                              ))}
                        </div>
                  </div>
            </section>
      );
};

export default ClubLeads;
