import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [darkMode]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-scrolled' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
        <button
          onClick={() => scrollToSection('hero')}
          data-testid="logo-button"
          className="text-xl font-bold tracking-tight nav-text-primary hover:text-[#4D9FFF] transition-colors"
        >
          SN
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {['about', 'projects', 'skills', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              data-testid={`nav-${section}`}
              className="text-sm nav-text-secondary hover:nav-text-primary transition-colors capitalize"
            >
              {section}
            </button>
          ))}

          <button
            onClick={toggleTheme}
            data-testid="theme-toggle-desktop"
            className="p-2 rounded-lg nav-text-secondary hover:nav-text-primary hover:bg-white/10 transition-all"
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
          
          <button
            onClick={() => scrollToSection('contact')}
            data-testid="nav-cta"
            className="px-6 py-2.5 nav-cta-btn text-sm font-medium rounded-md hover:scale-105 transition-all"
          >
            Get in touch
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle-mobile"
            className="p-2 rounded-lg nav-text-secondary hover:nav-text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            className="p-2 rounded-lg nav-text-primary hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mobile-menu border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {['about', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                data-testid={`mobile-nav-${section}`}
                className="text-left text-base nav-text-secondary hover:nav-text-primary transition-colors capitalize py-2"
              >
                {section}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              data-testid="mobile-nav-cta"
              className="mt-2 px-6 py-3 nav-cta-btn text-sm font-medium rounded-md text-center"
            >
              Get in touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
