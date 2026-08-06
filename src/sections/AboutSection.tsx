import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Code2, Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';

const aboutCards = [
  {
    id: 'bio',
    title: 'About Me',
    icon: User,
    subtitle: 'Architect of Modern Web Experiences',
    color: 'from-[#00D9FF] to-cyan-500',
    borderColor: 'border-[#00D9FF]/40',
    content: (
      <div className="space-y-3 text-sm text-slate-300">
        <p className="leading-relaxed">
          I am <strong className="text-white font-semibold">Vighnesh Sawant</strong>, a passionate Full Stack & Frontend Developer based in Mumbai, India. I specialize in bridging the gap between engineering rigor and futuristic visual design.
        </p>
        <p className="leading-relaxed">
          With extensive mastery in <span className="text-[#00D9FF] font-mono">React, Three.js, and TypeScript</span>, I construct hyper-interactive 3D web applications, microservices, and immersive design systems that wow users worldwide.
        </p>
        <div className="flex items-center space-x-2 pt-2 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Driven by performance, clean architecture, & flawless UX.</span>
        </div>
      </div>
    ),
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: Briefcase,
    subtitle: '2+ Years Engineering Excellence',
    color: 'from-[#8A2BE2] to-purple-600',
    borderColor: 'border-[#8A2BE2]/40',
    content: (
      <div className="space-y-3 text-sm text-slate-300">
        <div className="border-l-2 border-[#8A2BE2] pl-3 py-1 space-y-1">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-white">Full Stack 3D Developer</h4>
            <span className="text-xs font-mono text-[#8A2BE2]">2023 - Present</span>
          </div>
          <p className="text-xs text-slate-400">Led 3D WebGL initiatives, component libraries, & cloud microservices.</p>
        </div>
        <div className="border-l-2 border-slate-700 pl-3 py-1 space-y-1">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-white">Frontend React Developer</h4>
            <span className="text-xs font-mono text-slate-400">2021 - 2023</span>
          </div>
          <p className="text-xs text-slate-400">Crafted scalable SaaS dashboards, state management, & real-time analytics.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
    subtitle: 'Computer Science Foundation',
    color: 'from-[#FF007F] to-pink-600',
    borderColor: 'border-[#FF007F]/40',
    content: (
      <div className="space-y-3 text-sm text-slate-300">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-white">B.Tech in Computer Science</h4>
            <span className="text-xs font-mono text-[#FF007F]">Honors Graduate</span>
          </div>
          <p className="text-xs text-slate-400">
            Focused on Data Structures, Algorithms, Software Engineering, and Computer Graphics.
          </p>
        </div>
        <div className="pt-2 flex flex-wrap gap-2">
          {['Algorithms', '3D Graphics', 'System Design', 'Web Architecture'].map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-mono bg-pink-500/10 text-pink-300 border border-pink-500/20">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'skills-overview',
    title: 'Core Philosophy',
    icon: Code2,
    subtitle: 'Full Spectrum Craftsmanship',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-400/40',
    content: (
      <div className="space-y-3 text-sm text-slate-300">
        <p className="text-xs text-slate-300 leading-relaxed">
          I believe code is art. Every line should be clean, modular, and performant—delivering 60 FPS visual experiences without compromising speed.
        </p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-1.5 text-amber-300">
            <Zap className="w-3.5 h-3.5" />
            <span>60 FPS Render</span>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-1.5 text-amber-300">
            <Terminal className="w-3.5 h-3.5" />
            <span>Clean Code</span>
          </div>
        </div>
      </div>
    ),
  },
];

export const AboutSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="about" className="relative py-28 bg-[#050505] overflow-hidden z-20">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Smooth Entrance Container with 40px upward translate, fade in, & unblur */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHO I AM</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white"
          >
            Crafting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2]">Digital Dimension</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-sm sm:text-base text-slate-400"
          >
            Combining full-stack software architecture with cutting-edge 3D interactive graphics to produce memorable web platforms.
          </motion.p>
        </div>

        {/* Glassmorphism Cards Grid with Stagger Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === card.id;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50, filter: 'blur(8px)', scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative glass-card p-6 sm:p-8 rounded-3xl border ${card.borderColor} transition-all duration-500 cursor-pointer overflow-hidden transform-gpu ${isHovered ? 'scale-[1.02] -translate-y-2 border-[#00D9FF]/60 shadow-[0_15px_40px_rgba(0,217,255,0.2)]' : 'shadow-2xl'
                  }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Accent Corner Glow */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${card.color} opacity-10 rounded-bl-full group-hover:opacity-25 transition-opacity duration-500`}
                />

                {/* Card Header */}
                <div className="flex items-center space-x-4 mb-5">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${card.color} text-black font-bold shadow-[0_0_20px_rgba(0,217,255,0.3)]`}>
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400">{card.subtitle}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="relative z-10">{card.content}</div>

                {/* Cyber Card Footer Line */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>CARD_ID // 0{index + 1}</span>
                  <span className="text-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity">
                    EXPAND &gt;&gt;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
