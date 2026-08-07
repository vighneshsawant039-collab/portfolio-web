import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050505]/85 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#0b0f19] border border-[#00D9FF]/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,217,255,0.2)] z-10 my-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#00D9FF]/20 to-[#8A2BE2]/20 border border-[#00D9FF]/30 text-[#00D9FF]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white">Vighnesh Sawant</h3>
                  <p className="text-xs font-mono text-[#00D9FF]">Junior Full Stack Developer — Resume</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resume Summary Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm">
              {/* Profile Summary */}
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-heading font-semibold text-lg text-[#00D9FF] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D9FF]" />
                    Executive Summary
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                    Passionate Full Stack Developer with 1+ years of expertise crafting ultra-responsive web applications, 3D interactive graphics, microservices, and scalable React architectures. Recognized for high-performance frontend engineering and luxury UI design standards.
                  </p>
                </div>

                {/* Experience Highlights */}
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg text-[#8A2BE2] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#8A2BE2]" />
                    Key Experience Highlights
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="flex justify-between text-xs font-semibold text-white">
                        <span>Junior Full Stack Developer — TechNova Solutions</span>
                        <span className="text-[#00D9FF] font-mono">2024 - 2026</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Architected 3D product visualizers with WebGL & React Three Fiber, boosting user engagement by 140%.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="flex justify-between text-xs font-semibold text-white">
                        <span>Frontend Engineer — CyberPulse Labs</span>
                        <span className="text-[#00D9FF] font-mono">2024 - 2026</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Engineered state-of-the-art SaaS dashboards using React, TypeScript, and Node.js REST API microservices.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg text-emerald-400 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    Education
                  </h4>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>B.Tech in Computer Science & Engineering</span>
                      <span className="text-emerald-400 font-mono">GPA 3.9 / 4.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h5 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Core Technical Skills
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {['React JS', 'Frontend', 'Backend', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'HTML'].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Certifications & Awards
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-[#8A2BE2]" />
                      AWS Certified Developer Associate
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-[#8A2BE2]" />
                      Three.js Journey Master Class
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400">
                📄 Format: PDF | Size: 1.4 MB | Updated: 2024 - 2026
              </span>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors w-1/2 sm:w-auto"
                >
                  Close
                </button>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Simulated PDF Download: Vighnesh_Sawant_Resume_2024_2026.pdf generated!');
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-heading font-bold text-black bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2] hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,217,255,0.4)] flex items-center justify-center gap-2 w-1/2 sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
