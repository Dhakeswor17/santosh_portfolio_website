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
    <section id="hero" data-testid="hero-section" className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />

      <div className="hero-overlay absolute inset-0 z-[1]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="uppercase tracking-[0.2em] text-xs font-semibold theme-text-muted mb-6">
            Network Engineer · Software Developer · Full Stack Developer · IT Student · Builder
          </p>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold theme-text tracking-tight mb-6">
            Santosh Nyaupane
          </h1>
          
          <p className="text-base sm:text-lg theme-text-secondary max-w-2xl mx-auto leading-relaxed mb-12">
            Building reliable infrastructure at scale. From data centers at Google & Microsoft to full-stack applications — I bridge hardware, networks, and code.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              data-testid="hero-cta-projects"
              className="w-full sm:w-auto px-8 py-3.5 nav-cta-btn text-sm font-medium rounded-md hover:scale-105 transition-all"
            >
              View my work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              data-testid="hero-cta-contact"
              className="w-full sm:w-auto px-8 py-3.5 border theme-text text-sm font-medium rounded-md hover:bg-white/5 hover:scale-105 transition-all"
              style={{ borderColor: 'var(--border-color)' }}
            >
              Contact me
            </button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2" style={{ borderColor: 'var(--border-color)' }}>
          <div className="w-1 h-2 rounded-full" style={{ backgroundColor: 'var(--text-muted)' }} />
        </div>
      </div>
    </section>
  );
}
