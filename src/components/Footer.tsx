import React from 'react';
import { Heart, Mail } from 'lucide-react';

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

        {/* Live System Status Indicator & Social Links */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px]">ALL SYSTEMS OPERATIONAL // 60 FPS</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://github.com/vighneshsawant039-collab" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#00D9FF] transition-colors p-1">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#00D9FF] transition-colors p-1">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
              </svg>
            </a>
            <a href="mailto:vighneshsawant039@gmail.com" aria-label="Email" className="hover:text-[#00D9FF] transition-colors p-1">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center md:items-end space-y-1 font-mono text-slate-400">
          <p>© 2024 - 2026 Vighnesh Sawant. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Designed with <Heart className="w-3 h-3 text-[#FF007F] fill-current" /> using React, GSAP & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
