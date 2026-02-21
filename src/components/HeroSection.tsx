import SpaceGame from "./SpaceGame";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen lg:min-h-[90vh] flex items-center pt-24 pb-10 lg:pt-28 lg:pb-8 overflow-hidden"
    >

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left Column: Text */}
        <div className="text-left animate-in slide-in-from-left-10 fade-in duration-700">

          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <span className="h-px w-8 bg-cyan"></span>
          </div>

          <h1 className="font-orbitron text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-4 sm:mb-6">
            Discover the <br />
            <span className="text-gradient-multiverse relative inline-block">
              secrets
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span> of <br />
            <span className="text-white">CodeCraze 3.0</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed mb-7 sm:mb-10">
            Join us on this journey as we explore the concept of the Multiverse of Code.
            Ideate, Prototype, and Deploy in a thriller 24-hour window.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://unstop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none min-w-[180px] px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-cyan/50 hover:bg-black/60 transition-all duration-300 flex items-center justify-center gap-4 group"
            >
              <img src="/unstop-logo.svg" alt="Unstop Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan transition-colors">Register</span>
              </div>
            </a>
          </div>

          {/* Stats Footer */}
          <div className="flex gap-6 sm:gap-8 mt-7 sm:mt-10 pt-5 sm:pt-6 border-t border-white/5">
            <div>
              <div className="font-orbitron text-xl sm:text-2xl font-bold text-white">₹22k+</div>
              <div className="mono text-xs text-muted-foreground">Prize Pool</div>
            </div>
            <div>
              <div className="font-orbitron text-xl sm:text-2xl font-bold text-white">24h</div>
              <div className="mono text-xs text-muted-foreground">Duration</div>
            </div>
            <div>
              <div className="font-orbitron text-xl sm:text-2xl font-bold text-white">50+</div>
              <div className="mono text-xs text-muted-foreground">Teams</div>
            </div>
          </div>
        </div>

        {/* Right Column: Game */}
        <div className="relative h-[260px] sm:h-[380px] lg:h-[560px] flex items-center justify-center animate-in slide-in-from-right-10 fade-in duration-1000 delay-200">

          {/* Abstract glow behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-gradient-to-tr from-cyan/20 to-purple/20 rounded-full blur-[80px]" />

          {/* Main Game with decorative polygon clip */}
          <div className="relative w-full h-full max-w-2xl mx-auto">
            <div
              className="w-full h-full bg-[#000814] rounded-2xl sm:rounded-3xl relative z-10 overflow-hidden border border-cyan/20 shadow-2xl shadow-cyan/10"
              style={{
                clipPath: "polygon(12% 0%, 100% 0, 100% 85%, 88% 100%, 0 100%, 0% 15%)"
              }}
            >
              <SpaceGame />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent mix-blend-overlay pointer-events-none" />
            </div>

            {/* Decorative border outline */}
            <div
              className="absolute -inset-3 sm:-inset-4 border border-cyan/30 z-0 animate-pulse"
              style={{
                clipPath: "polygon(12% 0%, 100% 0, 100% 85%, 88% 100%, 0 100%, 0% 15%)"
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
