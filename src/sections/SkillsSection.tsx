import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Layers, Database, Code } from 'lucide-react';
import { SkillsCanvas } from '../components/3d/SkillsCanvas';

const skillCategories = [
  {
    category: 'Frontend & 3D Web',
    icon: Layers,
    color: '#00D9FF',
    skills: [
      { name: 'React.js / Next.js', level: 95 },
      { name: 'Three.js / WebGL / R3F', level: 90 },
      { name: 'TypeScript / JavaScript', level: 92 },
      { name: 'Tailwind CSS / Framer Motion', level: 95 },
    ],
  },
  {
    category: 'Backend & Microservices',
    icon: Code,
    color: '#8A2BE2',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Python / Fast API', level: 85 },
      { name: 'REST APIs & GraphQL', level: 88 },
      { name: 'System Design & Auth', level: 86 },
    ],
  },
  {
    category: 'Database & Cloud',
    icon: Database,
    color: '#FF007F',
    skills: [
      { name: 'MongoDB / Mongoose', level: 90 },
      { name: 'PostgreSQL / Prisma', level: 84 },
      { name: 'Redis Caching', level: 82 },
      { name: 'AWS / Docker / Vercel', level: 80 },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900 border border-[#8A2BE2]/30 text-xs font-mono text-[#8A2BE2]"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE TECH MATRIX</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white"
          >
            Floating 3D <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#8A2BE2] to-[#FF007F]">Skill Cubes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-sm sm:text-base text-slate-400"
          >
            Hover and rotate floating 3D cubes to inspect my primary tech stack in real-time.
          </motion.p>
        </div>

        {/* Active Hover Banner */}
        <div className="h-10 flex items-center justify-center mb-4">
          {activeSkill ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00D9FF]/20 to-[#8A2BE2]/20 border border-[#00D9FF]/50 text-sm font-mono text-white flex items-center gap-2 shadow-[0_0_20px_rgba(0,217,255,0.4)]"
            >
              <Sparkles className="w-4 h-4 text-[#00D9FF] animate-spin" />
              <span>ACTIVE MODEL: <strong className="text-[#00D9FF]">{activeSkill}</strong></span>
            </motion.div>
          ) : (
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
              // INTERACT WITH 3D CUBES ABOVE //
            </span>
          )}
        </div>

        {/* 3D R3F Skills Scene */}
        <div className="w-full mb-16 rounded-3xl glass-panel p-4 border border-[#00D9FF]/20 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <SkillsCanvas onHoverSkill={(name) => setActiveSkill(name)} />
        </div>

        {/* Tech Stack Proficiency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-[#00D9FF]/40"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700" style={{ color: cat.color }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">{cat.category}</h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-200">{skill.name}</span>
                        <span className="text-slate-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${cat.color}, #8A2BE2)`,
                            boxShadow: `0 0 10px ${cat.color}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
