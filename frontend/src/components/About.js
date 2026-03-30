import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaMicrosoft, FaShoppingCart, FaLaptopCode, FaDownload } from 'react-icons/fa';
import axios from 'axios';

export default function About() {
  const handleDownload = async (type) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.get(`${backendUrl}/api/download/${type}`);
      window.open(response.data.url, '_blank');
    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
    }
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
      period: 'September 2021 – April 2025',
      description: 'Supported R&D hardware development and system validation in production lab environments. Managed lab infrastructure, conducted hardware testing, and collaborated with engineering teams on product development cycles.',
      highlights: ['R&D Support', 'System Validation', 'Lab Management']
    },
    {
      icon: FaLaptopCode,
      company: 'Freelance',
      role: 'Full-Stack Developer',
      period: '2020 - Present',
      location: 'Finland',
      description: 'Delivered custom web applications and IoT solutions for clients across Finland. Specialized in React, Node.js, TypeScript, and database design. Built 30+ projects including e-commerce platforms, data visualization tools, and real-time monitoring systems.',
      highlights: ['Web Development', 'IoT Solutions', '30+ Projects Delivered']
    },
    {
      icon: FaShoppingCart,
      company: 'Bhat Bhateni Supermarket',
      role: 'IT Support Engineer',
      period: 'October 2014 - August 2016',
      location: 'Nepal',
      description: 'Provided technical support for one of Nepal\'s largest retail chains. Managed POS systems, network infrastructure, and inventory management software. Trained staff on new technologies and maintained IT infrastructure across multiple store locations.',
      highlights: ['POS Systems', 'Network Support', 'Staff Training']
    }
  ];

  return (
    <section id="about" data-testid="about-section" className="py-32 px-6 lg:px-12" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[0.2em] text-xs font-semibold text-zinc-400 mb-4">About Me</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F4F4F5] tracking-tight mb-12">Infrastructure meets code</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-[#F4F4F5] mb-4">Who I Am</h3>
              <p className="text-[#A1A1AA] leading-relaxed mb-4">
                I'm an IT student at Metropolia University with hands-on experience deploying and operating infrastructure at Google and Microsoft. My journey started with hardware and networks in retail IT, evolved through data center operations, and now encompasses full-stack development.
              </p>
              <p className="text-[#A1A1AA] leading-relaxed">
                Over the years, I've built 30+ projects as a freelance developer in Finland, ranging from IoT weather stations to LLM-powered applications. I believe the best solutions come from understanding both the physical infrastructure and the software that runs on it.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-[#F4F4F5] mb-4">What I Do</h3>
              <p className="text-[#A1A1AA] leading-relaxed">
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
            <div className="bg-[#18181B] border border-white/5 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-[#F4F4F5] mb-6">Download</h3>
              <div className="space-y-4">
                <button
                  onClick={() => handleDownload('resume')}
                  data-testid="download-resume"
                  className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#4D9FFF] transition-all group"
                >
                  <span className="text-[#F4F4F5] font-medium">Resume / CV</span>
                  <FaDownload className="text-[#4D9FFF] group-hover:translate-y-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleDownload('achievements')}
                  data-testid="download-achievements"
                  className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#4D9FFF] transition-all group"
                >
                  <span className="text-[#F4F4F5] font-medium">Achievements</span>
                  <FaDownload className="text-[#4D9FFF] group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="bg-[#18181B] border border-white/5 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-[#F4F4F5] mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-[#F4F4F5]">B.Eng in IT</p>
                  <p className="text-xs text-[#A1A1AA]">Metropolia University</p>
                  <p className="text-xs text-[#71717A]">Expected 2026</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F4F4F5]">B.Eng Industrial Engineering</p>
                  <p className="text-xs text-[#A1A1AA]">Centria University</p>
                  <p className="text-xs text-[#71717A]">2020</p>
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
          <h3 className="text-2xl font-semibold text-[#F4F4F5] mb-8">Professional Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div
                  key={index}
                  data-testid={`experience-${exp.company.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-[#18181B] border border-white/5 rounded-lg p-8 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-[#4D9FFF] text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#F4F4F5] mb-1">{exp.company}</h4>
                      <p className="text-sm text-[#A1A1AA] mb-1">{exp.role}</p>
                      <p className="text-xs text-[#71717A]">{exp.period}</p>
                      {exp.location && <p className="text-xs text-[#71717A]">{exp.location}</p>}
                    </div>
                  </div>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#A1A1AA]">
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
