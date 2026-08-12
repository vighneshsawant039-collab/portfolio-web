import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Layers, Database, Code, Globe, Shield, Terminal, Zap } from 'lucide-react';

const skillCategories = [
  {
    category: 'Frontend Technologies',
    icon: Layers,
    color: '#00D9FF',
    skills: [
      { name: 'React JS', level: 92, icon: Code, desc: 'Component Architecture & State' },
      { name: 'Frontend Engineering', level: 95, icon: Globe, desc: 'Responsive Layouts & Motion' },
      { name: 'Tailwind CSS', level: 90, icon: Zap, desc: 'Modern Styling System' },
      { name: 'HTML5 & Canvas', level: 95, icon: Terminal, desc: 'Semantic Structures & Graphics' },
    ],
  },
  {
    category: 'Backend & Database',
    icon: Database,
    color: '#8A2BE2',
    skills: [
      { name: 'Backend Node.js', level: 88, icon: Terminal, desc: 'Express Microservices & Logic' },
      { name: 'MongoDB', level: 85, icon: Database, desc: 'NoSQL Schemas & Aggregations' },
      { name: 'REST APIs', level: 90, icon: Shield, desc: 'Secure Auth & Telemetry' },
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
            Core Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#8A2BE2] to-[#FF007F]">Skill Stack</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-sm sm:text-base text-slate-400"
          >
            Explore my core competencies in frontend web engineering, backend architecture, and interactive web motion.
          </motion.p>
        </div>

        {/* Active Hover Banner */}
        <div className="h-10 flex items-center justify-center mb-6">
          {activeSkill ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00D9FF]/20 to-[#8A2BE2]/20 border border-[#00D9FF]/50 text-sm font-mono text-white flex items-center gap-2 shadow-[0_0_20px_rgba(0,217,255,0.4)]"
            >
              <Sparkles className="w-4 h-4 text-[#00D9FF] animate-spin" />
              <span>SELECTED TECH: <strong className="text-[#00D9FF]">{activeSkill}</strong></span>
            </motion.div>
          ) : (
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
              // HOVER OVER SKILL MODULES BELOW //
            </span>
          )}
        </div>

        {/* Tech Stack Proficiency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, idx) => {
            const CategoryIcon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-[#00D9FF]/40 transition-colors shadow-xl"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700" style={{ color: cat.color }}>
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">{cat.category}</h3>
                </div>

                <div className="space-y-5">
                  {cat.skills.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setActiveSkill(skill.name)}
                        onMouseLeave={() => setActiveSkill(null)}
                        className="group p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-[#00D9FF]/50 transition-all duration-300 cursor-pointer space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <SkillIcon className="w-4 h-4 text-[#00D9FF] group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-[#00D9FF]">{skill.level}%</span>
                        </div>

                        <p className="text-[11px] text-slate-400 font-mono">{skill.desc}</p>

                        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${cat.color}, #8A2BE2)`,
                              boxShadow: `0 0 8px ${cat.color}`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
