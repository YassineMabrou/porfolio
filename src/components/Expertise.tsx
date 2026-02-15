import React, { useState, useEffect, useRef } from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faDocker, faPython } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
  "React.js",
  "Node.js",
  "Express.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Flask",
  "Python",
  "MongoDB",
  "Solr",
  "Postman"
];

const labelsAIoT = [
  "OpenAI",
  "LangChain",
  "Hugging Face",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Streamlit",
  "TensorFlow",
  "LlamaIndex",
  "Groq",
  "IoT",
  "ESP32",
  "Sensor Integration",
  "Blynk"
];

const labelsDevOps = [
  "Git",
  "GitHub Actions",
  "Docker",
  "Linux",
  "Nginx",
  "REST APIs",
  "Deployment",
  "CI/CD",
  "Monitoring"
];

interface Skill {
  name: string;
  level: number;
  icon?: any;
}

const skills: Skill[] = [
  { name: "Frontend Development", level: 90 },
  { name: "Backend Development", level: 85 },
  { name: "Full-Stack Web Apps", level: 88 },
  { name: "AI & Machine Learning", level: 80 },
  { name: "IoT Integration", level: 82 },
  { name: "DevOps & Deployment", level: 75 },
];

function Expertise() {
  const [visibleSkills, setVisibleSkills] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSkills(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container" id="expertise" ref={containerRef}>
      <div className="skills-container">
        <h1>Expertise</h1>

        {/* Skill Bars */}
        <div className="skill-bars-section">
          <h2>Core Competencies</h2>
          <div className="skill-bars-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-bar-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar-container">
                  <div
                    className={`skill-bar ${visibleSkills ? 'animated' : ''}`}
                    style={{
                      width: visibleSkills ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise Cards */}
        <div className="skills-grid">

          {/* MERN Stack */}
          <div className="skill">
            <FontAwesomeIcon icon={faReact} size="3x" />
            <h3>MERN Stack Web Development</h3>
            <p>
              I specialize in building full-stack web applications using modern technologies like
              React.js, Node.js, Express.js, and MongoDB. I have hands-on experience throughout the
              Software Development Life Cycle (SDLC), covering both frontend and backend development.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFirst.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* AI & IoT */}
          <div className="skill">
            <FontAwesomeIcon icon={faPython} size="3x" />
            <h3>AI & IoT Integration</h3>
            <p>
              I combine Artificial Intelligence and Internet of Things technologies to develop
              smart connected systems. My work involves building AI models using Python frameworks
              and integrating them with IoT devices such as ESP32 for real-time data collection,
              analysis, and visualization.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsAIoT.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* DevOps */}
          <div className="skill">
            <FontAwesomeIcon icon={faDocker} size="3x" />
            <h3>DevOps & Deployment</h3>
            <p>
              I handle deployment and automation using Docker, Nginx, and Linux environments.
              I also manage CI/CD pipelines, version control, and continuous integration for
              efficient and reliable software delivery.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsDevOps.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Expertise;
