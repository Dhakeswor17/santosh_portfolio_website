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

       
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.projects || [];

        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-32 text-center" style={{ backgroundColor: '#121215' }}>
        <p className="text-[#A1A1AA]">Loading projects...</p>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 lg:px-12" style={{ backgroundColor: '#121215' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-10">Projects</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(Array.isArray(projects) ? projects : []).map((project, index) => (
            <motion.div
              key={project.id || index}
              className="bg-[#18181B] p-6 rounded-lg"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              <h3 className="text-xl text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {(Array.isArray(project.technologies) ? project.technologies : []).map((tech, i) => (
                  <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {(project.id === 2 || project.id === 8 || project.liveUrl) && (
                  <button
                    onClick={() => {
                      if (project.id === 2) navigate('/dashboard');
                      else if (project.id === 8) navigate('/barbershop-finder');
                      else if (project.liveUrl) window.open(project.liveUrl, '_blank');
                    }}
                    className="bg-blue-500 px-3 py-2 rounded text-white text-sm"
                  >
                    <FaEye /> Demo
                  </button>
                )}

                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <FaGithub />
                  </a>
                )}

                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}