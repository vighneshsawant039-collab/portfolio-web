import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, Rocket, ShieldCheck, Flame } from 'lucide-react';

const stats = [
  {
    id: 'projects',
    value: '0',
    label: 'Production Projects',
    subtext: 'Built & Deployed',
    icon: Rocket,
    color: '#00D9FF',
  },
  {
    id: 'experience',
    value: '1',
    label: 'Years Experience',
    subtext: 'Full Stack & 3D Web',
    icon: Code2,
    color: '#8A2BE2',
  },
  {
    id: 'commits',
    value: '7',
    label: 'Git Commits',
    subtext: 'Clean Production Code',
    icon: Flame,
    color: '#FF007F',
  },
  {
    id: 'uptime',
    value: '07%',
    label: 'App Reliability',
    subtext: 'High Performance SLA',
    icon: ShieldCheck,
    color: '#00FF88',
  },
];

export const AchievementsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900 border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF]"
          >
            <Award className="w-3.5 h-3.5" />
            <span>TRACK RECORD & METRICS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white"
          >
            Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#8A2BE2] to-[#FF007F]">Stats</span>
          </motion.h2>
        </div>

        {/* Floating Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass-card p-6 rounded-3xl border border-slate-800 hover:border-[#00D9FF]/50 text-center flex flex-col items-center justify-between relative overflow-hidden"
              >
                {/* Accent Top Border Glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  }}
                />

                {/* Floating Icon Badge */}
                <div
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                  style={{ color: stat.color }}
                >
                  <Icon className="w-8 h-8" />
                </div>

                {/* Animated Stat Counter */}
                <div className="space-y-1">
                  <h3 className="font-heading text-4xl sm:text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00D9FF] transition-colors">
                    {stat.value}
                  </h3>
                  <p className="font-heading font-semibold text-sm text-slate-200">{stat.label}</p>
                  <p className="text-xs font-mono text-slate-400">{stat.subtext}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
