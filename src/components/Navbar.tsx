import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Sparkles, FolderCode, User, Cpu, Send, Briefcase } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#hero', icon: Terminal },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Cpu },
  { name: 'Projects', href: '#projects', icon: FolderCode },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Send },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold set to 80px per spec
      setScrolled(window.scrollY > 80);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#050505]/75 backdrop-blur-xl border-b border-[#00D9FF]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 bg-transparent pointer-events-auto'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#8A2BE2] p-[1px] shadow-[0_0_15px_rgba(0,217,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,217,255,0.8)] transition-all duration-300">
              <div className="w-full h-full bg-[#050505] rounded-[11px] flex items-center justify-center">
                <span className="font-heading font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2]">
                  VS
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-wider text-white group-hover:text-[#00D9FF] transition-colors">
                VIGHNESH<span className="text-[#00D9FF]">.</span>DEV
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                3D Web Architect
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 glass-panel px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-300 rounded-full flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00D9FF]' : 'text-slate-500'}`} />
                  <span>{item.name}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/25 to-[#8A2BE2]/25 rounded-full border border-[#00D9FF]/50 -z-10 shadow-[0_0_15px_rgba(0,217,255,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Badge & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Hire</span>
            </div>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="relative px-5 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2] hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.4)] hover:shadow-[0_0_30px_rgba(0,217,255,0.8)] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Let's Talk</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 hover:text-[#00D9FF] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col space-y-4">
              <div className="text-xs font-mono text-[#00D9FF] uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">
                Navigation Menu
              </div>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`flex items-center space-x-4 p-3 rounded-xl border text-lg font-heading tracking-wide transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00D9FF]/20 to-[#8A2BE2]/20 border-[#00D9FF]/50 text-white shadow-[0_0_15px_rgba(0,217,255,0.3)]'
                        : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[#00D9FF] text-black' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span>{item.name}</span>
                  </motion.a>
                );
              })}
            </div>

            <div className="flex flex-col space-y-4">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="w-full py-3 rounded-xl text-center font-heading font-bold text-black bg-gradient-to-r from-[#00D9FF] to-[#8A2BE2] shadow-[0_0_20px_rgba(0,217,255,0.4)]"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
