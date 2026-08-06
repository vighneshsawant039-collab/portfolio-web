import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderCode, Sparkles, ArrowUpRight } from 'lucide-react';
import { ProjectModal } from '../components/ProjectModal';
import type { Project } from '../components/ProjectModal';

const projectsData: Project[] = [
  {
    id: 'aetheria-3d',
    title: 'Aetheria 3D Metaverse',
    category: '3D & WebGL',
    tagline: 'Immersive Spatial Web Workspace & 3D Visualizer',
    description: 'Real-time 3D spatial web environment built with Three.js, React Three Fiber, WebSockets, and Custom Shaders.',
    longDescription: 'Aetheria 3D Metaverse is an ultra-futuristic WebGL application enabling teams to collaborate inside a interactive 3D virtual HQ. Features custom volumetric lighting, procedural terrain shaders, particle effects, and spatial audio.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Three.js', 'React Three Fiber', 'WebGL', 'Tailwind CSS'],
    features: [
      'Interactive 3D procedural core models',
      'Postprocessing Bloom & Chromatic Aberration',
      'Real-time WebSocket multi-user sync',
      'Responsive 60+ FPS performance rendering',
    ],
    liveUrl: 'https://example.com/aetheria',
    githubUrl: 'https://github.com/vighnesh-sawant/aetheria-3d',
    stars: 142,
  },
  {
    id: 'cyberpulse-ai',
    title: 'CyberPulse AI Telemetry',
    category: 'Full Stack',
    tagline: 'Real-Time AI Analytics & Monitoring Dashboard',
    description: 'High-throughput analytics platform with real-time telemetry streaming, interactive charts, and predictive AI algorithms.',
    longDescription: 'Engineered for high-volume enterprise data, CyberPulse AI monitors server health, cloud metrics, and predictive workload spikes in real-time using React, TypeScript, Node.js, and WebSockets.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Node.js', 'TypeScript', 'Express', 'MongoDB', 'Chart.js'],
    features: [
      'Sub-millisecond WebSocket data streaming',
      'Custom glassmorphism dark theme charts',
      'Granular JWT authentication & role security',
      'Exportable telemetry reports & alerts',
    ],
    liveUrl: 'https://example.com/cyberpulse',
    githubUrl: 'https://github.com/vighnesh-sawant/cyberpulse-ai',
    stars: 98,
  },
  {
    id: 'hyperion-store',
    title: 'Hyperion 3D Store',
    category: 'Frontend',
    tagline: 'Luxury Tech Store with 3D Product Customizer',
    description: 'E-commerce platform featuring instant 3D model color customization, smooth camera controls, and sleek checkout UI.',
    longDescription: 'Hyperion reimagines online shopping by allowing customers to inspect, rotate, and re-skin cybernetic hardware in interactive 3D before purchasing.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Stripe API'],
    features: [
      'Real-time 3D model material customizer',
      'Smooth Lenis scrolling & page transitions',
      'Interactive cart drawer with dynamic calculation',
    ],
    liveUrl: 'https://example.com/hyperion',
    githubUrl: 'https://github.com/vighnesh-sawant/hyperion-3d-store',
    stars: 210,
  },
  {
    id: 'nexus-cloud',
    title: 'Nexus Cloud Orchestrator',
    category: 'Full Stack',
    tagline: 'Decentralized Microservices Management System',
    description: 'Comprehensive cloud node orchestrator dashboard for managing Docker containers, Kubernetes pods, & API routes.',
    longDescription: 'Nexus Cloud provides DevOps engineers with a centralized high-tech command center to monitor microservices, check cluster health, and deploy containers smoothly.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Docker', 'Express', 'Tailwind'],
    features: [
      'Live container CPU & RAM telemetry graphs',
      'Automated deployment logs viewer',
      'Role-based access security controls',
    ],
    liveUrl: 'https://example.com/nexus',
    githubUrl: 'https://github.com/vighnesh-sawant/nexus-cloud',
    stars: 175,
  },
];

const categories = ['All', 'Full Stack', 'Frontend', '3D & WebGL'];

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
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2]">3D & Web Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-sm sm:text-base text-slate-400"
          >
            Explore a selection of high-impact applications combining frontend elegance, 3D graphics, and robust full-stack architecture.
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
