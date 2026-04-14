import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const [skillsRes, categoriesRes] = await Promise.all([
          axios.get(`${backendUrl}/api/skills`),
          axios.get(`${backendUrl}/api/skills/categories`)
        ]);

        const skillsData = Array.isArray(skillsRes.data) ? skillsRes.data : skillsRes.data.skills || [];
        const categoriesData = Array.isArray(categoriesRes.data) ? categoriesRes.data : categoriesRes.data.categories || [];

        setSkills(skillsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setSkills([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="section-bg py-32 text-center">
        <p className="theme-text-secondary">Loading skills...</p>
      </section>
    );
  }

  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeSkills = Array.isArray(skills) ? skills : [];

  const skillsByCategory = safeCategories.reduce((acc, category) => {
    acc[category] = safeSkills.filter(skill => skill.category === category);
    return acc;
  }, {});

  return (
    <section id="skills" data-testid="skills-section" className="section-bg py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[0.2em] text-xs font-semibold theme-text-muted mb-4">Expertise</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold theme-text tracking-tight mb-10">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {safeCategories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
              viewport={{ once: true }}
              className="theme-card rounded-lg p-5 sm:p-6"
            >
              <h3 className="text-base font-semibold theme-text mb-5">{category}</h3>

              {(skillsByCategory[category] || []).map((skill, index) => (
                <div key={skill.id || index} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="theme-text-secondary">{skill.name}</span>
                    <span className="theme-text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-2 theme-skill-bar-bg rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level || 0}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full theme-skill-bar-fill rounded-full"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
git 