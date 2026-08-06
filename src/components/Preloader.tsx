import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleFinish = () => {
    setIsFinished(true);
    onComplete();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(handleFinish, 200);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 10;
        return Math.min(prev + increment, 100);
      });
    }, 25);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleFinish}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white selection:bg-none cursor-pointer"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#00D9FF]/10 blur-[120px] animate-pulse-slow" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#8A2BE2]/10 blur-[100px] animate-pulse-slow" />

          {/* Cyber Ring Loader */}
          <div className="relative flex items-center justify-center mb-6">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeDasharray={351}
                strokeDashoffset={351 - (351 * progress) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-100 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D9FF" />
                  <stop offset="100%" stopColor="#8A2BE2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center">
              <span className="font-heading text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2]">
                {progress}%
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center space-y-1 text-center">
            <h2 className="font-heading text-lg font-semibold tracking-widest text-slate-200 uppercase">
              INITIALIZING CYBERSPACE
            </h2>
            <p className="text-[11px] font-mono text-slate-500">
              Click anywhere to enter immediately &rarr;
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
