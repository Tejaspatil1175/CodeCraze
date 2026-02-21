import { useState } from "react";
import { Menu, X, ExternalLink, FileText, BookOpen } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Prizes", href: "#prizes" },
  { label: "Domains", href: "#domains" },
  { label: "Flow", href: "#flow" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-2xl border border-cyan/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md bg-background/70 transition-all duration-300 ${open ? "bg-background/95" : ""}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="font-orbitron text-xl font-black text-gradient-cyan">CodeCraze 3.0</span>
            <span className="font-orbitron text-xs text-muted-foreground border border-border px-1.5 py-0.5 rounded">2026</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mono text-sm text-muted-foreground hover:text-cyan transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            <div className="flex items-center gap-3 ml-2 pl-6 border-l border-white/10">
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/50 bg-cyan/5 text-cyan hover:bg-cyan/20 transition-all duration-300 text-xs font-orbitron tracking-wide whitespace-nowrap">
                <FileText size={14} />
                <span>Templates</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan text-black hover:bg-cyan/80 transition-all duration-300 text-xs font-orbitron font-bold tracking-wide whitespace-nowrap">
                <BookOpen size={14} />
                <span>Rulebook</span>
              </a>
            </div>
          </div>


          {/* Mobile toggle */}
          <button
            className="md:hidden text-muted-foreground hover:text-cyan transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-4 border-t border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mono text-sm text-muted-foreground hover:text-cyan transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-white/5">
            <a href="#" className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-cyan/50 bg-cyan/5 text-cyan hover:bg-cyan/20 transition-all text-xs font-orbitron tracking-wide">
              <FileText size={14} />
              <span>Submission Templates</span>
            </a>
            <a href="#" className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan text-black hover:bg-cyan/80 transition-all text-xs font-orbitron font-bold tracking-wide">
              <BookOpen size={14} />
              <span>Brochure & Rulebook</span>
            </a>
          </div>
        </div>
      )}

      {/* Club Website Link */}
      <div className="absolute -bottom-8 left-8 z-[-1] animate-in slide-in-from-top-4 duration-700 delay-500 fade-in hidden md:block">
        <a
          href="https://fetch-ai-deployment.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-1.5 bg-background/90 backdrop-blur-md border border-t-0 border-cyan/30 rounded-b-xl text-[10px] uppercase tracking-widest text-cyan hover:bg-cyan/10 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300"
        >
          <span>Visit Club Website</span>
          <ExternalLink size={10} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
