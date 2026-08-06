import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlanetCanvas } from '../components/3d/PlanetCanvas';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Energetic particle shockwave confetti burst!
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#00D9FF', '#8A2BE2', '#FF007F', '#00FF88'],
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900 border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white"
          >
            Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#8A2BE2] to-[#FF007F]">Transmission</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-sm sm:text-base text-slate-400"
          >
            Have a revolutionary idea or high-impact project in mind? Reach out and let's construct the future together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Floating Planet Canvas & Social Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* 3D Planet */}
            <div className="rounded-3xl glass-panel p-2 border border-[#00D9FF]/30 shadow-[0_0_40px_rgba(0,217,255,0.2)]">
              <PlanetCanvas />
            </div>

            {/* Quick Contact Info */}
            <div className="space-y-4">
              <a
                href="mailto:vighneshsawant039@gmail.com"
                className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center space-x-4 hover:border-[#00D9FF]/40 transition-colors block"
              >
                <div className="p-3 rounded-xl bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase">Direct Email</p>
                  <p className="text-sm font-semibold text-white">vighneshsawant039@gmail.com</p>
                </div>
              </a>

              <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase">Location</p>
                  <p className="text-sm font-semibold text-white">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

            {/* Social Links - GitHub & Email only */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://github.com/vighneshsawant039-collab"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#00D9FF] hover:border-[#00D9FF]/50 transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="mailto:vighneshsawant039@gmail.com"
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#00D9FF] hover:border-[#00D9FF]/50 transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-[#00D9FF]/30 shadow-[0_0_50px_rgba(0,217,255,0.15)] relative">
              {/* Form Success State */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>TRANSMISSION RECEIVED! I will respond within 24 hours.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Your Name <span className="text-[#00D9FF]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elon Musk"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Email Address <span className="text-[#00D9FF]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. elon@tesla.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    Subject / Project Scope
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. 3D Web Application Development"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all placeholder:text-slate-600"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    Message <span className="text-[#00D9FF]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your vision, timeline, or inquiries..."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                {/* Energetic Wave Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm font-heading font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#00D9FF] via-[#8A2BE2] to-[#FF007F] hover:opacity-95 transition-all duration-300 shadow-[0_0_30px_rgba(0,217,255,0.5)] flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="font-mono text-xs text-black animate-pulse">TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
