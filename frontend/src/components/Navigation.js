import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
        <button
          onClick={() => scrollToSection('hero')}
          data-testid="logo-button"
          className="text-xl font-bold tracking-tight text-[#F4F4F5] hover:text-[#4D9FFF] transition-colors"
        >
          SN
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about')}
            data-testid="nav-about"
            className="text-sm text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            data-testid="nav-projects"
            className="text-sm text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            data-testid="nav-skills"
            className="text-sm text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            data-testid="nav-contact"
            className="text-sm text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
          >
            Contact
          </button>
          
          <button
            onClick={() => scrollToSection('contact')}
            data-testid="nav-cta"
            className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 hover:scale-105 transition-all"
          >
            Get in touch
          </button>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          data-testid="theme-toggle"
          className="md:hidden text-[#F4F4F5] hover:text-[#4D9FFF] transition-colors"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </nav>
  );
}
