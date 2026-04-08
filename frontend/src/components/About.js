import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaMicrosoft, FaShoppingCart, FaLaptopCode, FaDownload } from 'react-icons/fa';

export default function About() {
  const handleDownload = (type) => {
    const files = {
      resume: '/files/Santosh_Nyaupane_Resume.pdf',
      achievements: '/files/Santosh_Nyaupane_Achievements.pdf'
    };
    const link = document.createElement('a');
    link.href = files[type];
    link.download = files[type].split('/').pop();
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const experiences = [
    {
      icon: FaGoogle,
      company: 'Google',
      role: 'Data Center Technician',
      period: 'April 2025 - Jan 2026',
      description: 'Operating and maintaining large-scale private data networks and infrastructure. Responsible for server deployment, network configuration, hardware troubleshooting, and ensuring 99.99% uptime across multiple data center facilities.',
      highlights: ['Network Operations', 'Infrastructure Management', 'Hardware Deployment']
    },
    {
      icon: FaMicrosoft,
      company: 'Microsoft',
      role: 'Senior Lab Operator',
      period: 'September 2021 - April 2025',
      description: 'Supported R&D hardware development and system validation in production lab environments. Managed lab infrastructure, conducted hardware testing, and collaborated with engineering teams on product development cycles.',
      highlights: ['R&D Support', 'System Validation', 'Lab Management']
    },
    {
      icon: FaLaptopCode,
      company: 'Freelance',
      role: 'Full-Stack Developer',
      period: '2020 - Present',
      description: 'Delivered custom web applications and IoT solutions for clients across Finland. Specialized in React, Node.js, TypeScript, and database design. Built 30+ projects including e-commerce platforms, data visualization tools, and real-time monitoring systems.',
      highlights: ['Web Development', 'IoT Solutions', '30+ Projects Delivered']
    },
    {
      icon: FaShoppingCart,
      company: 'Bhat Bhateni Supermarket',
      role: 'IT Support Engineer',
      period: 'October 2014 - August 2016',
      description: 'Provided technical support for one of Nepal\'s largest retail chains. Managed POS systems, network infrastructure, and inventory management software. Trained staff on new technologies and maintained IT infrastructure across multiple store locations.',
      highlights: ['POS Systems', 'Network Support', 'Staff Training']
    }
  ];

  return (
    <section id="about" data-testid="about-section" className="section-bg py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[0.2em] text-xs font-semibold theme-text-muted mb-4">About Me</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold theme-text tracking-tight mb-12">Infrastructure meets code</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="theme-card backdrop-blur-xl rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-semibold theme-text mb-4">Who I Am</h3>
              <p className="theme-text-secondary leading-relaxed mb-4">
                I'm an IT student at Metropolia University with hands-on experience deploying and operating infrastructure at Google and Microsoft. My journey started with hardware and networks in retail IT, evolved through data center operations, and now encompasses full-stack development.
              </p>
              <p className="theme-text-secondary leading-relaxed">
                Over the years, I've built 30+ projects as a freelance developer in Finland, ranging from IoT weather stations to LLM-powered applications. I believe the best solutions come from understanding both the physical infrastructure and the software that runs on it.
              </p>
            </div>

            <div className="theme-card backdrop-blur-xl rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-semibold theme-text mb-4">What I Do</h3>
              <p className="theme-text-secondary leading-relaxed">
                I bridge the gap between physical infrastructure and software. Whether it's troubleshooting Linux systems in a data center, automating deployment workflows, building real-time monitoring dashboards, or creating modern web applications with React and TypeScript — I focus on making complex systems reliable, maintainable, and user-friendly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="theme-card-solid rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-semibold theme-text mb-6">Download</h3>
              <div className="space-y-4">
                <button
                  onClick={() => handleDownload('resume')}
                  data-testid="download-resume"
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 theme-download-btn rounded-lg group"
                >
                  <span className="theme-text font-medium text-sm sm:text-base">Resume / CV</span>
                  <FaDownload className="theme-accent group-hover:translate-y-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleDownload('achievements')}
                  data-testid="download-achievements"
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 theme-download-btn rounded-lg group"
                >
                  <span className="theme-text font-medium text-sm sm:text-base">Achievements</span>
                  <FaDownload className="theme-accent group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="theme-card-solid rounded-lg p-6 sm:p-8">
              <h3 className="text-lg font-semibold theme-text mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium theme-text">B.Eng in IT</p>
                  <p className="text-xs theme-text-secondary">Metropolia University</p>
                  <p className="text-xs theme-text-muted">Expected 2026</p>
                </div>
                <div>
                  <p className="text-sm font-medium theme-text">B.Eng Industrial Engineering</p>
                  <p className="text-xs theme-text-secondary">Centria University</p>
                  <p className="text-xs theme-text-muted">2020</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl sm:text-2xl font-semibold theme-text mb-8">Professional Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div
                  key={index}
                  data-testid={`experience-${exp.company.toLowerCase().replace(/\s+/g, '-')}`}
                  className="theme-card-solid rounded-lg p-6 sm:p-8 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-card)' }}>
                      <Icon className="theme-accent text-xl sm:text-2xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-semibold theme-text mb-1">{exp.company}</h4>
                      <p className="text-sm theme-text-secondary mb-1">{exp.role}</p>
                      <p className="text-xs theme-text-muted">{exp.period}</p>
                    </div>
                  </div>
                  <p className="text-sm theme-text-secondary leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <span key={i} className="theme-tag px-3 py-1 rounded-full text-xs">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
