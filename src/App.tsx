import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Loader = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onDone, 600);
      }, 300);
    }
  }, [progress, onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] transition-opacity duration-700 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Logo */}
      <div className="mb-10 text-center">
        <div className="font-orbitron text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2 animate-pulse">
          CodeCraze 3.0
        </div>
        <div className="mono text-xs text-cyan-500/60 tracking-[0.4em] uppercase">
          Multiverse of Code
        </div>
      </div>

      {/* Spinner ring */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-cyan/10" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan animate-spin"
          style={{ animationDuration: "1s" }}
        />
        <div
          className="absolute inset-2 rounded-full border border-transparent border-t-purple/60 animate-spin"
          style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-orbitron text-xs font-bold text-cyan">
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 sm:w-80 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-200 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <p className="mono text-[10px] text-muted-foreground/40 tracking-widest mt-4 uppercase">
        Initializing...
      </p>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {loading && <Loader onDone={() => setLoading(false)} />}

        {/* Global Background Video */}
        <div className="fixed inset-0 w-full h-full overflow-hidden z-[-1]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          {/* Global Overlays */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-background/40" />
          <div className="absolute inset-0 grid-bg opacity-10" />
        </div>

        <Toaster />
        <Sonner />
        <Analytics />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
