import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'santoshnyaupane25@gmail.com',
      link: 'mailto:santoshnyaupane25@gmail.com',
      iconColor: '#EA4335',
      iconBg: 'rgba(234, 67, 53, 0.12)'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+358 44 968 4333',
      link: 'tel:+358449684333',
      iconColor: '#4D9FFF',
      iconBg: 'rgba(77, 159, 255, 0.12)'
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: '+358 44 968 4333',
      link: 'https://wa.me/358449684333',
      iconColor: '#25D366',
      iconBg: 'rgba(37, 211, 102, 0.12)'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Espoo, Finland',
      link: null,
      iconColor: '#FF6B6B',
      iconBg: 'rgba(255, 107, 107, 0.12)'
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com', testId: 'social-linkedin', color: '#0A66C2' },
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com/Dhakeswor17', testId: 'social-github', color: 'var(--text-primary)' },
    { icon: FaWhatsapp, label: 'WhatsApp', url: 'https://wa.me/358449684333', testId: 'social-whatsapp', color: '#25D366' }
  ];

  return (
    <section id="contact" data-testid="contact-section" className="section-bg-alt py-32 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-semibold theme-text-muted mb-4">Get in Touch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold theme-text tracking-tight mb-6">Let's Connect</h2>
          <p className="theme-text-secondary text-base max-w-2xl mx-auto">
            Open to opportunities in infrastructure engineering, full-stack development, and DevOps. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const content = (
              <div className="theme-card backdrop-blur-xl rounded-lg p-6 sm:p-8 text-center group hover:scale-[1.03] transition-all">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: info.iconBg }}
                >
                  <Icon style={{ color: info.iconColor }} className="text-2xl sm:text-3xl" />
                </div>
                <p className="text-xs theme-text-muted uppercase tracking-wider mb-2">{info.label}</p>
                <p className="theme-text text-sm font-medium break-all sm:break-normal">{info.value}</p>
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
                  <a href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block">
                    {content}
                  </a>
                ) : content}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="theme-card-solid rounded-lg p-8 sm:p-12 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-semibold theme-text mb-4">Connect on Social Media</h3>
          <p className="theme-text-secondary mb-8">Follow my journey and stay updated with my latest projects</p>
          
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
                  className="w-14 h-14 sm:w-16 sm:h-16 theme-card rounded-2xl flex items-center justify-center hover:scale-110 transition-all"
                >
                  <Icon style={{ color: social.color }} className="text-2xl sm:text-3xl" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}