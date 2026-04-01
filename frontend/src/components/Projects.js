import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt, FaEye } from 'react-icons/fa';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-32 px-6 lg:px-12" style={{ backgroundColor: '#121215' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#A1A1AA]">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" data-testid="projects-section" className="py-32 px-6 lg:px-12" style={{ backgroundColor: '#121215' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-semibold text-zinc-400 mb-4">Featured Work</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F4F4F5] tracking-tight mb-6">Selected Projects</h2>
          <p className="text-[#A1A1AA] text-base max-w-2xl">
            A collection of infrastructure automation, monitoring systems, and full-stack applications built to solve real operational challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {projects.map((project, index) => {
            const colSpan = index === 0 ? 'lg:col-span-8' : 'lg:col-span-4';
            
            return (
              <motion.div
                key={project.id}
                data-testid={`project-card-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${colSpan} group relative overflow-hidden rounded-lg bg-[#18181B] border border-white/5 hover:border-white/20 transition-all`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-[#F4F4F5] mb-3 group-hover:text-[#4D9FFF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#A1A1AA]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {(project.id === 2 || project.id === 8) && (
                      <button
                        onClick={() => navigate(project.id === 2 ? '/dashboard' : '/barbershop-finder')}
                        data-testid={`project-demo-${project.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#4D9FFF] text-white text-sm font-medium rounded-md hover:bg-[#7CB9FF] transition-colors"
                      >
                        <FaEye size={16} />
                        View Live Demo
                      </button>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-github-${index}`}
                        className="text-[#A1A1AA] hover:text-[#4D9FFF] transition-colors"
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-live-${index}`}
                        className="text-[#A1A1AA] hover:text-[#4D9FFF] transition-colors"
                      >
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
