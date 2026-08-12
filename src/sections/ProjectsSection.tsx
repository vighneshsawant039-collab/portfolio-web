import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderCode, Sparkles, ArrowUpRight } from 'lucide-react';
import { ProjectModal } from '../components/ProjectModal';
import type { Project } from '../components/ProjectModal';

const projectsData: Project[] = [
  {
    id: 'qr-attendance-system',
    title: 'QR-Based Attendance System',
    category: 'Full Stack',
    tagline: 'Automated Contactless Attendance Tracker via QR Code Scanning',
    description: 'Real-time attendance management system utilizing dynamic QR codes, instant scanning validation, roll call telemetry, and automated record generation.',
    longDescription: 'Designed to streamline institution and office attendance, the QR-Based Attendance System features automated dynamic QR code generation, camera-based scanning, instant student/employee check-in validation, and exportable attendance reports.',
    image: '/projects/qr-attendance.png',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'QR Scanner', 'Tailwind CSS'],
    features: [
      'Dynamic QR code generation & camera scanner',
      'Real-time check-in validation & attendance tracking',
      'Automated daily/monthly analytics & report exports',
      'Secure authentication & role-based dashboard access',
    ],
    liveUrl: 'https://github.com/vighneshsawant039-collab/qr-attendance-system',
    githubUrl: 'https://github.com/vighneshsawant039-collab/qr-attendance-system',
    stars: 12,
  },
  {
    id: 'portfolio-web',
    title: 'Interactive Cyber Portfolio',
    category: 'Full Stack & UI',
    tagline: 'High-Performance Developer Portfolio & Interactive Showcase',
    description: 'Ultra-modern portfolio featuring interactive canvas visuals, glassmorphism design system, smooth scroll transitions, and GSAP animations.',
    longDescription: 'Built to demonstrate cutting-edge frontend web engineering, this portfolio features GSAP ScrollTrigger animations, Framer Motion transitions, clean JavaScript architecture, and dark cyber aesthetic.',
    image: '/projects/portfolio-web.png',
    tags: ['React', 'GSAP', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    features: [
      'Interactive GSAP ScrollTrigger animation sequence',
      'Glassmorphism futuristic UI design system',
      'Responsive mobile-first layout & smooth animations',
      'Integrated case study modals & project showcase',
    ],
    liveUrl: 'https://vighneshsawant039-collab.github.io/portfolio-web',
    githubUrl: 'https://github.com/vighneshsawant039-collab/portfolio-web',
    stars: 18,
  },
  {
    id: 'student-management-system',
    title: 'Student Management System',
    category: 'Full Stack',
    tagline: 'Comprehensive Academic Administration & Student Portal',
    description: 'SaaS platform for managing student profiles, course enrollments, grade calculations, fee tracking, and academic analytics.',
    longDescription: 'A full-featured student management software enabling academic administrators and students to manage course registrations, monitor academic performance, track tuition fees, and maintain student databases seamlessly.',
    image: '/projects/student-management.png',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Tailwind CSS'],
    features: [
      'Centralized student profile & academic records database',
      'Course enrollment management & grade tracking',
      'Interactive analytics dashboard for performance metrics',
      'Secure REST API with JWT authorization',
    ],
    liveUrl: 'https://github.com/vighneshsawant039-collab/student-management-system',
    githubUrl: 'https://github.com/vighneshsawant039-collab/student-management-system',
    stars: 15,
  },
];

const categories = ['All', 'Full Stack', 'UI & Animations'];

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900 border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF]"
          >
            <FolderCode className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2]">Web & Interactive Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-sm sm:text-base text-slate-400"
          >
            Explore a selection of high-impact applications combining frontend elegance, GSAP animations, and robust full-stack architecture.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2] text-black shadow-[0_0_20px_rgba(0,217,255,0.4)]'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group relative glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-[#00D9FF]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container with Hover Scale */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-[#00D9FF] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{project.category}</span>
                  </div>

                  {/* Corner Expand Action */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 border border-slate-700 text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_#00D9FF]">
                    <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#00D9FF]/80">{project.tagline}</p>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Card Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      ⭐ {project.stars} Stars
                    </span>
                    <span className="text-[#00D9FF] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      VIEW CASE STUDY &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
