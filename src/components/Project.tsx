import React, { useState, useRef } from "react";
import LazyImage from './LazyImage';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';
import mock05 from '../assets/images/mock05.png';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import mock08 from '../assets/images/mock08.png';
import mock09 from '../assets/images/mock09.png';
import mock10 from '../assets/images/mock10.png';
import mock11 from '../assets/images/mock11.png';
import calendarPDF from '../assets/images/pdfs/1707581319322.pdf';
import '../assets/styles/Project.scss';

interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string | null;
  alt: string;
  tags: string[];
  category: string;
  year: string;
}

const projects: ProjectData[] = [
  {
    id: 1,
    title: "Smart Stable",
    description: "AI + IoT platform using ESP32 sensors and ONNX to monitor horse health with real-time alerts and a full React dashboard.",
    image: mock10,
    link: "https://github.com/YassineMabrou/backend",
    alt: "Smart Stable",
    tags: ["React", "ESP32", "AI", "IoT", "Python"],
    category: "AI/IoT",
    year: "2025"
  },
    {
    id: 9,
    title: "Semantic Rag",
    description: "Develop a semantic search module that enables querying a vector database using a Retrieval-Augmented Generation (RAG) approach.",
    image: mock11,
    link: "https://github.com/YassineMabrou/semantic_rag1",
    alt: "Semantic Rag",
    tags: ["Python",  "PostgreSQL", "Docker" , "LLMs" , "Streamlit" ],
    category: "AI/IoT",
    year: "2026"
  },
  {
    id: 2,
    title: "Log Viewer",
    description: "End-to-end log analysis tool built with Python, Flask, Solr, and React to parse, index, search, and visualize application logs.",
    image: mock09,
    link: "https://github.com/YassineMabrou/logviewer",
    alt: "Log Viewer",
    tags: ["React", "Python", "Flask", "Solr"],
    category: "Full-Stack",
    year: "2024"
  },
  {
    id: 3,
    title: "Player Injury Detection",
    description: "Real-time sports injury detection system using Arduino sensors, ONNX AI model, Node.js API, and a React monitoring interface.",
    image: mock08,
    link: "https://github.com/YassineMabrou/player-injury-detection",
    alt: "Player Injury Detection",
    tags: ["Node.js", "React", "Arduino", "AI"],
    category: "AI/IoT",
    year: "2025"
  },
  {
    id: 4,
    title: "Weather Application",
    description: "Live weather application built with React and public APIs featuring instant search, animated UI, and mobile-friendly design.",
    image: mock07,
    link: "https://github.com/YassineMabrou/weather-app",
    alt: "Weather App",
    tags: ["React", "APIs", "UI/UX"],
    category: "Frontend",
    year: "2025"
  },
  {
    id: 5,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce platform using React, Node.js, and MongoDB with authentication, cart system, and admin product control.",
    image: mock06,
    link: "https://github.com/YassineMabrou/e-commerce",
    alt: "E-commerce App",
    tags: ["React", "Node.js", "MongoDB"],
    category: "Full-Stack",
    year: "2024"
  },
  {
    id: 6,
    title: "Backpack Landing",
    description: "Minimal and responsive landing page built with pure HTML, CSS, and JavaScript for a modern product showcase.",
    image: mock05,
    link: calendarPDF,
    alt: "Backpack Landing Page",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    year: "2023"
  },
  {
    id: 7,
    title: "Personal Portfolio",
    description: "Clean and modern portfolio website built with React.js showcasing projects, skills, and experience in a smooth UI.",
    image: mock04,
    link: "https://github.com/YassineMabrou/porfolio",
    alt: "Personal Portfolio",
    tags: ["React", "TypeScript", "SCSS"],
    category: "Frontend",
    year: "2025"
  },
  {
    id: 8,
    title: "Flask Docker Server",
    description: "Containerized Flask backend demonstrating clean API architecture, Docker deployment, and scalable microservice setup.",
    image: mock03,
    link: "https://github.com/YassineMabrou/flask-server-running-in-docker",
    alt: "Flask Docker Server",
    tags: ["Flask", "Docker", "Python"],
    category: "DevOps",
    year: "2023"
  },
];

const categories = ["All", "AI/IoT", "Full-Stack", "Frontend", "DevOps"];

function Project() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
    setHoveredProject(null);
  };

  return (
    <section className="projects" id="projects">
      {/* Section Header */}
      <div className="projects__header">
        <span className="projects__label">
          <span className="projects__label-line" />
          Selected Work
          <span className="projects__label-line" />
        </span>
        <h2 className="projects__title">
          Featured <em>Projects</em>
        </h2>
        <p className="projects__subtitle">
          A curated collection of my recent work in web development, AI, and IoT
        </p>
      </div>

      {/* Category Filter */}
      <div className="projects__filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`projects__filter ${activeCategory === category ? 'projects__filter--active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
            {activeCategory === category && <span className="projects__filter-indicator" />}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects__grid">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`projects__card ${hoveredProject === project.id ? 'projects__card--hovered' : ''}`}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Card Glow Effect */}
            <div className="projects__card-glow" />
            
            {/* Image Container */}
            <div className="projects__card-image">
              <LazyImage src={project.image} alt={project.alt} className="projects__image" />
              <div className="projects__card-overlay">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="projects__card-link"
                  >
                    <GitHubIcon />
                    <span>View Code</span>
                  </a>
                )}
              </div>
              <span className="projects__card-year">{project.year}</span>
            </div>

            {/* Card Content */}
            <div className="projects__card-content">
              <span className="projects__card-category">{project.category}</span>
              
              <h3 className="projects__card-title">
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    {project.title}
                    <OpenInNewIcon />
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              
              <p className="projects__card-description">{project.description}</p>
              
              <div className="projects__card-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="projects__tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Card Border */}
            <div className="projects__card-border" />
          </div>
        ))}
      </div>

      {/* View More Link */}
      <div className="projects__more">
        <a 
          href="https://github.com/YassineMabrou" 
          target="_blank" 
          rel="noreferrer"
          className="projects__more-link"
        >
          <span>View All Projects on GitHub</span>
          <OpenInNewIcon />
        </a>
      </div>
    </section>
  );
}

export default Project;
