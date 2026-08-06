import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Download, ChevronDown, Mail, Code, Layers, Terminal } from 'lucide-react';
import { HeroParticles } from '../components/HeroParticles';
import { ResumeModal } from '../components/ResumeModal';

gsap.registerPlugin(ScrollTrigger);

const typewriterRoles = [
  'Full Stack Developer',
  'React Developer',
  'Frontend Engineer',
];

const SocialGithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/vighneshsawant039-collab', icon: SocialGithubIcon },
  { name: 'Email', href: 'mailto:vighneshsawant039@gmail.com', icon: Mail },
];

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const containerRef = useRef<HTMLDivElement>(null);
  const heroPinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // Typewriter Subtitle logic
  useEffect(() => {
    const fullRole = typewriterRoles[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && currentText !== fullRole) {
      timer = setTimeout(() => {
        setCurrentText(fullRole.substring(0, currentText.length + 1));
      }, 90);
    } else if (!isDeleting && currentText === fullRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && currentText !== '') {
      timer = setTimeout(() => {
        setCurrentText(fullRole.substring(0, currentText.length - 1));
      }, 40);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % typewriterRoles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // Track Mouse Movement for Parallax Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: clientX / innerWidth,
      y: clientY / innerHeight,
    });
  };

  // Ensure Video plays immediately on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) videoRef.current.muted = true;
      });
    }
  }, []);

  // GSAP ScrollTrigger Pinning & Video Zoom Exit Animation
  useEffect(() => {
    const pinCtx = gsap.context(() => {
      if (!containerRef.current || !heroPinRef.current) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=220vh',
          pin: heroPinRef.current,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // 1. Slowly scale the video from 100% to 112% (cinematic camera zoom)
      if (videoWrapperRef.current) {
        timeline.to(
          videoWrapperRef.current,
          {
            scale: 1.12,
            ease: 'none',
          },
          0
        );
      }

      // 2. Dynamic overlay opacity during scroll transition
      if (overlayRef.current) {
        timeline.to(
          overlayRef.current,
          {
            backgroundColor: 'rgba(5, 5, 5, 0.75)',
            ease: 'none',
          },
          0
        );
      }

      // 3. Move hero content upward while fading opacity from 1 to 0 with exit blur
      if (contentRef.current) {
        timeline.to(
          contentRef.current,
          {
            y: -140,
            opacity: 0,
            filter: 'blur(10px)',
            ease: 'power2.inOut',
          },
          0
        );
      }

      // 4. Fade out vertical social icons
      if (socialRef.current) {
        timeline.to(
          socialRef.current,
          {
            opacity: 0,
            x: -30,
            ease: 'power2.inOut',
          },
          0
        );
      }
    }, containerRef);

    return () => pinCtx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax offsets based on mouse movement
  const parallaxContentX = (mousePos.x - 0.5) * 18;
  const parallaxContentY = (mousePos.y - 0.5) * 18;

  return (
    <div ref={containerRef} className="relative w-full">
      <section
        id="hero"
        ref={heroPinRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-screen overflow-hidden selection:bg-[#00D9FF] selection:text-black flex items-center justify-center bg-[#050505]"
      >
        {/* LAYER 1: Dark Base Background */}
        <div className="absolute inset-0 bg-[#050505] z-0" />

        {/* LAYER 2: Visible Cinematic Video Background */}
        <div
          ref={videoWrapperRef}
          className="absolute inset-0 z-[1] overflow-hidden transform-gpu will-change-transform"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-95"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* LAYER 3: Dark Overlay (rgba(0,0,0,0.35)) for maximum video visibility & text readability */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[2] bg-black/35 backdrop-brightness-[0.9] transition-colors duration-300 pointer-events-none"
        />

        {/* LAYER 4: Subtle Animated Particles, Light Streaks & Floating Dust */}
        <HeroParticles mousePos={mousePos} />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00D9FF]/15 rounded-full blur-[150px] pointer-events-none z-[3] animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8A2BE2]/15 rounded-full blur-[150px] pointer-events-none z-[3] animate-pulse-slow" />

        {/* VERTICALLY ALIGNED SOCIAL ICONS (LEFT MARGIN) - GitHub & Email only */}
        <div
          ref={socialRef}
          className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center space-y-5"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#00D9FF]/50" />
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                aria-label={social.name}
                className="group relative p-2.5 rounded-full glass-panel border border-white/10 hover:border-[#00D9FF]/50 text-slate-400 hover:text-[#00D9FF] transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
              >
                <Icon className="w-4 h-4" />
                <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  {social.name}
                </span>
              </a>
            );
          })}
          <div className="w-[1px] h-12 bg-gradient-to-t from-transparent to-[#00D9FF]/50" />
        </div>

        {/* LAYER 5 (TOP): HERO CONTENT */}
        <div
          ref={contentRef}
          style={{
            transform: `translate3d(${parallaxContentX}px, ${parallaxContentY}px, 0)`,
          }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pointer-events-none transition-transform duration-100 ease-out"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto inline-flex items-center space-x-2.5 px-4 py-2 rounded-full glass-panel border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF] mb-6 shadow-[0_0_25px_rgba(0,217,255,0.25)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span className="tracking-widest uppercase font-semibold">WELCOME TO MY PORTFOLIO</span>
          </motion.div>

          {/* Large Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 mb-6"
          >
            <h2 className="font-heading text-xl sm:text-2xl font-medium tracking-widest text-slate-300 uppercase drop-shadow-md">
              Hi, I'm
            </h2>
            <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-none drop-shadow-2xl">
              Vighnesh{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#8A2BE2] to-[#FF007F] neon-text-blue">
                Sawant
              </span>
            </h1>
          </motion.div>

          {/* Animated Typing Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-12 flex items-center justify-center mb-6"
          >
            <div className="flex items-center space-x-2 text-xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-100 drop-shadow-lg">
              <span className="text-[#00D9FF] font-mono">&gt;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                {currentText}
              </span>
              <span className="w-1 h-8 bg-[#00D9FF] animate-pulse inline-block shadow-[0_0_8px_#00D9FF]" />
            </div>
          </motion.div>

          {/* Short Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-300 font-sans leading-relaxed mb-8 text-center drop-shadow-md"
          >
            Crafting high-performance web applications, interactive 3D visual experiences, and scalable frontends with clean architectural craftsmanship.
          </motion.p>

          {/* Tech Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10 pointer-events-auto"
          >
            {[
              { label: 'React / Next.js', icon: Code },
              { label: 'WebGL / Three.js', icon: Layers },
              { label: 'Full Stack Node', icon: Terminal },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-slate-950/80 border border-slate-700/80 text-slate-300 flex items-center gap-1.5 backdrop-blur-xl hover:border-[#00D9FF]/50 transition-colors shadow-md"
                >
                  <Icon className="w-3.5 h-3.5 text-[#00D9FF]" />
                  {item.label}
                </span>
              );
            })}
          </motion.div>

          {/* CTA Buttons with Spring Animation */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.65,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pointer-events-auto"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto px-9 py-4 rounded-full text-sm font-heading font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:shadow-[0_0_45px_rgba(0,217,255,0.85)] flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setIsResumeOpen(true)}
              className="w-full sm:w-auto px-9 py-4 rounded-full text-sm font-heading font-semibold uppercase tracking-wider text-white bg-slate-950/85 hover:bg-slate-900 border border-[#00D9FF]/40 hover:border-[#00D9FF] transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center justify-center gap-2.5 group cursor-pointer backdrop-blur-xl hover:scale-105"
            >
              <Download className="w-4 h-4 text-[#00D9FF] group-hover:scale-110 transition-transform" />
              <span>Download Resume</span>
            </button>
          </motion.div>

          {/* Animated Scroll Indicator with "VIGHNESH SAWANT" prominently displayed beside it */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -bottom-24 sm:-bottom-28 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 pointer-events-auto cursor-pointer group glass-panel px-5 py-2.5 rounded-full border border-[#00D9FF]/30 hover:border-[#00D9FF]/70 transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.2)]"
            onClick={() => scrollToSection('about')}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-heading font-extrabold tracking-widest text-white uppercase group-hover:text-[#00D9FF] transition-colors">
                VIGHNESH <span className="text-[#00D9FF]">SAWANT</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-ping" />
            </div>

            <div className="w-[1px] h-5 bg-slate-700/80" />

            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase">
                SCROLL
              </span>
              <div className="w-5 h-8 rounded-full border border-slate-500 flex items-start justify-center p-1 bg-slate-950/60">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  className="w-1 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]"
                />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#00D9FF] animate-bounce" />
            </div>
          </motion.div>
        </div>

        {/* Resume Modal */}
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </section>
    </div>
  );
};
