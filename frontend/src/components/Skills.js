import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const [skillsRes, categoriesRes] = await Promise.all([
          axios.get(`${backendUrl}/api/skills`),
          axios.get(`${backendUrl}/api/skills/categories`)
        ]);
        setSkills(skillsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-32 px-6 lg:px-12" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#A1A1AA]">Loading skills...</p>
        </div>
      </section>
    );
  }

  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = skills.filter(skill => skill.category === category);
    return acc;
  }, {});

  return (
    <section id="skills" data-testid="skills-section" className="py-32 px-6 lg:px-12" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-semibold text-zinc-400 mb-4">Technical Arsenal</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F4F4F5] tracking-tight mb-6">Skills & Tools</h2>
          <p className="text-[#A1A1AA] text-base max-w-2xl">
            Technologies and tools I use to build reliable systems and solve complex problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              data-testid={`skill-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-8"
            >
              <h3 className="text-lg font-semibold text-[#F4F4F5] mb-6">{category}</h3>
              <div className="space-y-4">
                {skillsByCategory[category]?.map((skill, skillIndex) => (
                  <div key={skill.id} data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#A1A1AA]">{skill.name}</span>
                      <span className="text-xs text-[#71717A]">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-[#4D9FFF] to-[#7CB9FF] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
