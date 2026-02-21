const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="section-divider mb-12" />
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-orbitron text-xl font-black text-gradient-cyan mb-1">CodeCraze 3.0</div>
          <p className="text-muted-foreground text-sm">Where Ideas Become Reality</p>
        </div>
        <div className="flex flex-col items-center sm:items-end gap-1">
          <p className="mono text-xs text-muted-foreground">Organized by R. C. Patel Institute of Technology, Shirpur & Fetch AI Club</p>
          <p className="mono text-xs text-muted-foreground/60">© 2026 CodeCraze 3.0. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
