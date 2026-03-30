import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'santoshnyaupane25@gmail.com',
      link: 'mailto:santoshnyaupane25@gmail.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+358 44 968 4333',
      link: 'tel:+358449684333'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Espoo, Finland',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com',
      testId: 'social-linkedin'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      url: 'https://github.com',
      testId: 'social-github'
    }
  ];

  return (
    <section id="contact" data-testid="contact-section" className="py-32 px-6 lg:px-12" style={{ backgroundColor: '#121215' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-semibold text-zinc-400 mb-4">Get in Touch</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F4F4F5] tracking-tight mb-6">Let’s Connect</h2>
          <p className="text-[#A1A1AA] text-base max-w-2xl mx-auto">
            Open to opportunities in infrastructure engineering, full-stack development, and DevOps. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const content = (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-8 hover:border-white/20 transition-all text-center">
                <div className="w-14 h-14 bg-[#4D9FFF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-[#4D9FFF] text-xl" />
                </div>
                <p className="text-xs text-[#71717A] uppercase tracking-wider mb-2">{info.label}</p>
                <p className="text-[#F4F4F5] text-sm font-medium">{info.value}</p>
              </div>
            );

            return (
              <motion.div
                key={index}
                data-testid={`contact-${info.label.toLowerCase()}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {info.link ? (
                  <a href={info.link} className="block">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-[#18181B] border border-white/5 rounded-lg p-12 text-center"
        >
          <h3 className="text-2xl font-semibold text-[#F4F4F5] mb-4">Connect on Social Media</h3>
          <p className="text-[#A1A1AA] mb-8">Follow my journey and stay updated with my latest projects</p>
          
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={social.testId}
                  className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-[#4D9FFF] hover:scale-110 transition-all"
                >
                  <Icon className="text-[#F4F4F5] text-xl" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
