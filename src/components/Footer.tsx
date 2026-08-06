import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#020202] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-heading font-bold text-lg text-white">
              VIGHNESH<span className="text-[#00D9FF]">.</span>DEV
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20">
              v4.0
            </span>
          </div>
          <p className="text-slate-400 text-center md:text-left max-w-sm">
            Crafting futuristic 3D developer portfolios & state-of-the-art web platforms.
          </p>
        </div>

        {/* Live System Status Indicator */}
        <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px]">ALL SYSTEMS OPERATIONAL // 60 FPS</span>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center md:items-end space-y-1 font-mono text-slate-400">
          <p>© {new Date().getFullYear()} Vighnesh Sawant. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Designed with <Heart className="w-3 h-3 text-[#FF007F] fill-current" /> using React, Three.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};
