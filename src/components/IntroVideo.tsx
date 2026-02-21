import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface IntroVideoProps {
      onComplete: () => void;
}

const IntroVideo = ({ onComplete }: IntroVideoProps) => {
      const [isExiting, setIsExiting] = useState(false);

      const handleEnded = () => {
            setIsExiting(true);
            setTimeout(onComplete, 500); // Allow exit animation to play
      };

      return (
            <div
                  className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ${isExiting ? "opacity-0" : "opacity-100"
                        }`}
            >
                  <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleEnded}
                  >
                        <source src="/entry.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                  </video>

                  <Button
                        variant="ghost"
                        className="absolute bottom-8 right-4 sm:right-8 text-white/50 hover:text-white hover:bg-white/10 z-10 text-xs sm:text-sm px-3 sm:px-4"
                        onClick={handleEnded}
                  >
                        Skip Intro
                  </Button>
            </div>
      );
};

export default IntroVideo;
