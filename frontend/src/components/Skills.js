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

        
        const skillsData = Array.isArray(skillsRes.data)
          ? skillsRes.data
          : skillsRes.data.skills || [];

        const categoriesData = Array.isArray(categoriesRes.data)
          ? categoriesRes.data
          : categoriesRes.data.categories || [];

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

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section className="py-32 text-center" style={{ backgroundColor: '#0A0A0A' }}>
        <p className="text-[#A1A1AA]">Loading skills...</p>
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
    <section className="py-32 px-6 lg:px-12" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl text-white mb-10">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeCategories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              className="bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <h3 className="text-white mb-4">{category}</h3>

              {(skillsByCategory[category] || []).map((skill, index) => (
                <div key={skill.id || index} className="mb-3">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>

                  <div className="h-2 bg-gray-800 rounded">
                    <div
                      className="h-full bg-blue-500 rounded"
                      style={{ width: `${skill.level || 0}%` }}
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