import React from "react";
import LazyImage from './LazyImage';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';
import mock05 from '../assets/images/mock05.png';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import mock08 from '../assets/images/mock08.png';
import mock09 from '../assets/images/mock09.png';
import mock10 from '../assets/images/mock10.png';

// Import the PDF file
import calendarPDF from '../assets/images/pdfs/1707581319322.pdf';

import '../assets/styles/Project.scss';

interface ProjectData {
  title: string;
  description: string;
  image: string;
  link: string | null;
  alt: string;
  tags: string[];
}

const projects: ProjectData[] = [
  {
    title: "Smart Stable",
    description:
      "AI + IoT platform using ESP32 sensors and ONNX to monitor horse health with real-time alerts and a full React dashboard.",
    image: mock10,
    link: "https://github.com/YassineMabrou/backend",
    alt: "Smart Stable",
    tags: ["React", "ESP32", "AI", "IoT", "Python"]
  },
  {
    title: "Log Viewer",
    description:
      "End-to-end log analysis tool built with Python, Flask, Solr, and React to parse, index, search, and visualize application logs.",
    image: mock09,
    link: "https://github.com/YassineMabrou/logviewer",
    alt: "Log Viewer",
    tags: ["React", "Python", "Flask", "Solr"]
  },
  {
    title: "Player Injury Detection",
    description:
      "Real-time sports injury detection system using Arduino sensors, ONNX AI model, Node.js API, and a React monitoring interface.",
    image: mock08,
    link: "https://github.com/YassineMabrou/player-injury-detection",
    alt: "Player Injury Detection",
    tags: ["Node.js", "React", "Arduino", "AI", "Real-time"]
  },
  {
    title: "Weather Application",
    description:
      "Live weather application built with React and public APIs featuring instant search, animated UI, and mobile-friendly design.",
    image: mock07,
    link: "https://github.com/YassineMabrou/weather-app",
    alt: "Weather App",
    tags: ["React", "APIs", "Responsive", "UI/UX"]
  },
  {
    title: "E-commerce Application",
    description:
      "Full-stack e-commerce platform using React, Node.js, and MongoDB with authentication, cart system, and admin product control.",
    image: mock06,
    link: "https://github.com/YassineMabrou/e-commerce",
    alt: "E-commerce App",
    tags: ["React", "Node.js", "MongoDB", "Full-stack"]
  },
  {
    title: "Backpack Landing Page",
    description:
      "Minimal and responsive landing page built with pure HTML, CSS, and JavaScript for a modern product showcase.",
    image: mock05,

    // Open PDF on click
    link: calendarPDF,
    alt: "Backpack Landing Page",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Personal Portfolio",
    description:
      "Clean and modern portfolio website built with React.js showcasing projects, skills, and experience in a smooth UI.",
    image: mock04,
    link: "https://github.com/YassineMabrou/porfolio",
    alt: "Personal Portfolio",
    tags: ["React", "TypeScript", "SCSS"]
  },
  {
    title: "Flask Server in Docker",
    description:
      "Containerized Flask backend demonstrating clean API architecture, Docker deployment, and scalable microservice setup.",
    image: mock03,
    link: "https://github.com/YassineMabrou/flask-server-running-in-docker",
    alt: "Flask Docker Server",
    tags: ["Flask", "Docker", "Python", "DevOps"]
  },
];

function Project() {
  return (
    <div className="projects-container" id="projects">
      <h1>Personal Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image-wrapper">
              {/* Image click with Lazy Loading */}
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                  <LazyImage
                    src={project.image}
                    alt={project.alt}
                    className="project-image"
                  />
                  <div className="overlay">
                    <span className="overlay-text">View Project</span>
                  </div>
                </a>
              ) : (
                <div className="project-link">
                  <LazyImage
                    src={project.image}
                    alt={project.alt}
                    className="project-image"
                  />
                </div>
              )}
            </div>

            <div className="project-content">
              {/* Title click */}
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer">
                  <h2>{project.title}</h2>
                </a>
              ) : (
                <h2>{project.title}</h2>
              )}

              <p>{project.description}</p>

              {/* Tech Stack Tags */}
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
