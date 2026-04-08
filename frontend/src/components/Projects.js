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
        const data = Array.isArray(response.data) ? response.data : response.data.projects || [];
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="section-bg-alt py-32 text-center">
        <p className="theme-text-secondary">Loading projects...</p>
      </section>
    );
  }

  return (
    <section id="projects" data-testid="projects-section" className="section-bg-alt py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[0.2em] text-xs font-semibold theme-text-muted mb-4">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold theme-text tracking-tight mb-10">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(Array.isArray(projects) ? projects : []).map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="theme-card-solid rounded-lg overflow-hidden group"
            >
              <div className="overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold theme-text mb-2">{project.title}</h3>
                <p className="text-sm theme-text-secondary mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(Array.isArray(project.technologies) ? project.technologies : []).map((tech, i) => (
                    <span key={i} className="theme-tag text-xs px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {(project.id === 2 || project.id === 8 || project.liveUrl) && (
                    <button
                      onClick={() => {
                        if (project.id === 2) navigate('/dashboard');
                        else if (project.id === 8) navigate('/barbershop-finder');
                        else if (project.liveUrl) window.open(project.liveUrl, '_blank');
                      }}
                      data-testid={`project-demo-${project.id}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-all hover:scale-105"
                      style={{ backgroundColor: 'var(--accent)' }}
                    >
                      <FaEye size={14} />
                      <span>Demo</span>
                    </button>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-testid={`project-github-${project.id}`}
                      className="p-2 rounded-md theme-text-secondary hover:theme-text transition-colors"
                      style={{ backgroundColor: 'var(--bg-card)' }}
                    >
                      <FaGithub size={18} />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-testid={`project-live-${project.id}`}
                      className="p-2 rounded-md theme-text-secondary hover:theme-text transition-colors"
                      style={{ backgroundColor: 'var(--bg-card)' }}
                    >
                      <FaExternalLinkAlt size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
