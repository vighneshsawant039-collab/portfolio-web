import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';

const timelineEvents = [
  {
    year: '2023 - Present',
    role: 'Senior Full Stack & 3D Web Architect',
    company: 'TechNova Cyber Systems',
    location: 'Mumbai, IN',
    description: 'Leading frontend architecture, 3D WebGL product visualizers, microservices integration, and mentoring high-performing engineering teams.',
    achievements: [
      'Built 3D web configurators boosting user conversion by 140%',
      'Architected state management reducing re-renders by 45%',
      'Spearheaded transition to TypeScript, Next.js & Tailwind CSS',
    ],
    side: 'left',
    badge: 'PRESENT',
    color: '#00D9FF',
  },
  {
    year: '2021 - 2023',
    role: 'Frontend React Developer',
    company: 'CyberPulse Innovations',
    location: 'Remote',
    description: 'Designed and built scalable SaaS analytics dashboards, real-time telemetry streams, and responsive UI design systems.',
    achievements: [
      'Developed 20+ responsive dashboard modules in React & REST APIs',
      'Optimized asset loading & Lighthouse performance to 98/100',
      'Implemented real-time WebSocket notifications & charts',
    ],
    side: 'right',
    badge: 'CAREER',
    color: '#8A2BE2',
  },
  {
    year: '2020 - 2021',
    role: 'Full Stack Engineering Intern',
    company: 'Apex Code Studio',
    location: 'Mumbai, IN',
    description: 'Collaborated on client web portals, backend REST endpoints in Node.js, Express, and MongoDB database schema designs.',
    achievements: [
      'Built full-stack MongoDB & Express backend services',
      'Integrated Stripe payments and OAuth 2.0 authentication',
    ],
    side: 'left',
    badge: 'EARLY CAREER',
    color: '#FF007F',
  },
  {
    year: '2017 - 2021',
    role: 'B.Tech in Computer Science',
    company: 'University of Technology',
    location: 'Mumbai, IN',
    description: 'Graduated with First Class Honors in CS Engineering. Specialized in Web Development, Software Engineering, and Computer Graphics.',
    achievements: [
      'President of Computer Science Coding Society',
      '1st Place Winner in National Hackathon 2020',
    ],
    side: 'right',
    badge: 'EDUCATION',
    color: '#00FF88',
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900 border border-[#8A2BE2]/30 text-xs font-mono text-[#8A2BE2]"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER MILESTONES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white"
          >
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#8A2BE2] to-[#FF007F]">Timeline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-sm sm:text-base text-slate-400"
          >
            A chronological timeline of my professional growth, technical contributions, and educational achievements.
          </motion.p>
        </div>

        {/* Vertical Cyber Timeline */}
        <div className="relative">
          {/* Animated Glowing Center Progress Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-800 transform -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="w-full bg-gradient-to-b from-[#00D9FF] via-[#8A2BE2] to-[#FF007F] shadow-[0_0_15px_#00D9FF]"
            />
          </div>

          <div className="space-y-12">
            {timelineEvents.map((item, index) => {
              const isLeft = item.side === 'left';
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center">
                  {/* Glowing Node Marker */}
                  <div className="absolute left-4 md:left-1/2 top-6 transform -translate-x-1/2 z-20">
                    <div
                      className="w-8 h-8 rounded-full bg-[#050505] border-2 flex items-center justify-center shadow-[0_0_15px_currentColor]"
                      style={{ borderColor: item.color, color: item.color }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-current animate-ping" />
                    </div>
                  </div>

                  {/* Card Container */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -60 : 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, delay: index * 0.15 }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                    }`}
                  >
                    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-[#00D9FF]/40 space-y-4">
                      {/* Year & Badge */}
                      <div className={`flex items-center gap-3 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                          style={{
                            backgroundColor: `${item.color}15`,
                            color: item.color,
                            border: `1px solid ${item.color}40`,
                          }}
                        >
                          {item.year}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                          {item.badge}
                        </span>
                      </div>

                      {/* Title & Company */}
                      <div>
                        <h3 className="font-heading text-xl font-bold text-white">{item.role}</h3>
                        <p className="text-xs font-mono text-[#00D9FF] flex items-center gap-2 mt-1 justify-start md:justify-start">
                          <BuildingIcon className="w-3.5 h-3.5" />
                          <span>{item.company}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Achievements List */}
                      <div className="space-y-1.5 pt-2 text-xs text-slate-300">
                        {item.achievements.map((ach, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-2 ${isLeft ? 'md:justify-end' : 'justify-start'}`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9m4 0V7m0 0h4m-4 0H9" />
    </svg>
  );
}
