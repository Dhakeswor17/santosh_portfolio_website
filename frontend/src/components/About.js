import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaMicrosoft, FaServer, FaNetworkWired } from 'react-icons/fa';

export default function About() {
  const experiences = [
    {
      icon: FaGoogle,
      company: 'Google',
      role: 'Data Center Technician',
      period: 'April 2025 - Jan 2026',
      description: 'Operating and maintaining large-scale private data networks and infrastructure'
    },
    {
      icon: FaMicrosoft,
      company: 'Microsoft',
      role: 'Senior Lab Operator',
      period: 'September 2021 – April 2025',
      description: 'Supported R&D hardware development and system validation in production lab environments'
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#4D9FFF]/10 rounded-full flex items-center justify-center">
                  <FaServer className="text-[#4D9FFF] text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#F4F4F5]">Background</h3>
              </div>
              <p className="text-[#A1A1AA] leading-relaxed">
                I'm an IT student at Metropolia University with hands-on experience deploying and operating infrastructure at Google and Microsoft. My journey started with hardware and networks, and evolved into building full-stack applications that solve operational problems at scale.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#4D9FFF]/10 rounded-full flex items-center justify-center">
                  <FaNetworkWired className="text-[#4D9FFF] text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#F4F4F5]">What I Do</h3>
              </div>
              <p className="text-[#A1A1AA] leading-relaxed">
                I bridge the gap between physical infrastructure and software. Whether it's troubleshooting Linux systems in a data center, automating deployment workflows, or building dashboards to monitor network health — I focus on making complex systems reliable and maintainable.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div
                  key={index}
                  data-testid={`experience-${exp.company.toLowerCase()}`}
                  className="bg-[#18181B] border border-white/5 rounded-lg p-8 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-[#4D9FFF] text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#F4F4F5] mb-1">{exp.company}</h3>
                      <p className="text-sm text-[#A1A1AA] mb-2">{exp.role}</p>
                      <p className="text-xs text-[#71717A] mb-3">{exp.period}</p>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
