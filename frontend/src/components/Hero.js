import React from 'react';
import { motion } from 'framer-motion';
import Scene3D from './Scene3D';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" data-testid="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #0d1117 50%, #0A0A0A 100%)' }}>
      <Scene3D />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 z-[1]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="uppercase tracking-[0.2em] text-xs font-semibold text-zinc-400 mb-6">
            Network Engineer · Software Developer · Full Stack Developer · IT Student · Builder
          </p>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F4F5] tracking-tight mb-6">
            Santosh Nyaupane
          </h1>
          
          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-12">
            Building reliable infrastructure at scale. From data centers at Google & Microsoft to full-stack applications — I bridge hardware, networks, and code.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              data-testid="hero-cta-projects"
              className="px-8 py-3.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 hover:scale-105 transition-all"
            >
              View my work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              data-testid="hero-cta-contact"
              className="px-8 py-3.5 border border-white/20 text-white text-sm font-medium rounded-md hover:bg-white/5 hover:scale-105 transition-all"
            >
              Contact me
            </button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
