import React, { useState, useEffect, useRef } from "react";
import { useInView } from 'react-intersection-observer';
import '../assets/styles/Expertise.scss';

// Skill data with categories
interface SkillNode {
  name: string;
  proficiency: number;
  category: 'frontend' | 'backend' | 'ai' | 'devops';
}

const skillNodes: SkillNode[] = [
  // Frontend
  { name: "React", proficiency: 95, category: 'frontend' },
  { name: "TypeScript", proficiency: 88, category: 'frontend' },
  { name: "Next.js", proficiency: 82, category: 'frontend' },
  { name: "Tailwind", proficiency: 90, category: 'frontend' },
  { name: "SCSS", proficiency: 92, category: 'frontend' },
  // Backend
  { name: "Node.js", proficiency: 90, category: 'backend' },
  { name: "Express", proficiency: 88, category: 'backend' },
  { name: "MongoDB", proficiency: 85, category: 'backend' },
  { name: "Flask", proficiency: 80, category: 'backend' },
  { name: "REST APIs", proficiency: 92, category: 'backend' },
  // AI/IoT
  { name: "Python", proficiency: 88, category: 'ai' },
  { name: "TensorFlow", proficiency: 75, category: 'ai' },
  { name: "OpenAI", proficiency: 85, category: 'ai' },
  { name: "ESP32", proficiency: 82, category: 'ai' },
  { name: "IoT", proficiency: 80, category: 'ai' },
  // DevOps
  { name: "Docker", proficiency: 85, category: 'devops' },
  { name: "Git", proficiency: 95, category: 'devops' },
  { name: "Linux", proficiency: 82, category: 'devops' },
  { name: "CI/CD", proficiency: 78, category: 'devops' },
];

interface ExpertiseCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  accent: string;
}

const expertiseCards: ExpertiseCard[] = [
  {
    id: 'frontend',
    title: "Frontend",
    subtitle: "Architecture",
    description: "Crafting pixel-perfect interfaces with modern React ecosystems. Focus on performance, accessibility, and elegant user experiences.",
    skills: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "SCSS", "Framer Motion"],
    accent: "#c9a227"
  },
  {
    id: 'backend',
    title: "Backend",
    subtitle: "Systems",
    description: "Building robust server architectures and RESTful APIs. Database design, authentication, and scalable service patterns.",
    skills: ["Node.js", "Express", "MongoDB", "Flask", "PostgreSQL", "GraphQL"],
    accent: "#a0c4ff"
  },
  {
    id: 'ai',
    title: "AI & IoT",
    subtitle: "Intelligence",
    description: "Integrating machine learning models with embedded systems. Real-time sensor data processing and intelligent automation.",
    skills: ["Python", "TensorFlow", "OpenAI", "ESP32", "LangChain", "Sensor Networks"],
    accent: "#bdb2ff"
  },
  {
    id: 'devops',
    title: "DevOps",
    subtitle: "Operations",
    description: "Streamlining deployment pipelines and infrastructure. Container orchestration, monitoring, and continuous delivery.",
    skills: ["Docker", "Git", "GitHub Actions", "Linux", "Nginx", "CI/CD"],
    accent: "#caffbf"
  }
];

function Expertise() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const constellationRef = useRef<HTMLDivElement>(null);
  
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Track mouse for constellation interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (constellationRef.current) {
        const rect = constellationRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate orbital positions for skills
  const getOrbitalPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  // Group skills by category for orbital rings
  const frontendSkills = skillNodes.filter(s => s.category === 'frontend');
  const backendSkills = skillNodes.filter(s => s.category === 'backend');
  const aiSkills = skillNodes.filter(s => s.category === 'ai');
  const devopsSkills = skillNodes.filter(s => s.category === 'devops');

  return (
    <section className="expertise" id="expertise" ref={sectionRef}>
      {/* Background Elements */}
      <div className="expertise__bg">
        <div className="expertise__grid-pattern" />
        <div className="expertise__glow expertise__glow--1" />
        <div className="expertise__glow expertise__glow--2" />
      </div>

      {/* Section Header */}
      <div className={`expertise__header ${inView ? 'expertise__header--visible' : ''}`}>
        <span className="expertise__label">
          <span className="expertise__label-line" />
          Technical Proficiency
          <span className="expertise__label-line" />
        </span>
        <h2 className="expertise__title">
          Core <em>Expertise</em>
        </h2>
        <p className="expertise__subtitle">
          A constellation of technologies I've mastered throughout my journey
        </p>
      </div>

      <div className="expertise__content">
        {/* Skill Constellation */}
        <div 
          className={`expertise__constellation ${inView ? 'expertise__constellation--visible' : ''}`}
          ref={constellationRef}
          style={{
            transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
          }}
        >
          {/* Central Core */}
          <div className="expertise__core">
            <span className="expertise__core-text">MERN</span>
            <span className="expertise__core-subtitle">Full Stack</span>
            <div className="expertise__core-pulse" />
            <div className="expertise__core-pulse expertise__core-pulse--delayed" />
          </div>

          {/* Orbital Rings */}
          <div className="expertise__orbit expertise__orbit--1">
            {frontendSkills.map((skill, i) => {
              const pos = getOrbitalPosition(i, frontendSkills.length, 120);
              return (
                <div
                  key={skill.name}
                  className="expertise__node expertise__node--frontend"
                  style={{
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <span className="expertise__node-label">{skill.name}</span>
                  <div 
                    className="expertise__node-fill"
                    style={{ height: `${skill.proficiency}%` }}
                  />
                </div>
              );
            })}
          </div>

          <div className="expertise__orbit expertise__orbit--2">
            {backendSkills.map((skill, i) => {
              const pos = getOrbitalPosition(i, backendSkills.length, 200);
              return (
                <div
                  key={skill.name}
                  className="expertise__node expertise__node--backend"
                  style={{
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    animationDelay: `${i * 0.15 + 0.5}s`
                  }}
                >
                  <span className="expertise__node-label">{skill.name}</span>
                  <div 
                    className="expertise__node-fill"
                    style={{ height: `${skill.proficiency}%` }}
                  />
                </div>
              );
            })}
          </div>

          <div className="expertise__orbit expertise__orbit--3">
            {[...aiSkills, ...devopsSkills].map((skill, i) => {
              const pos = getOrbitalPosition(i, aiSkills.length + devopsSkills.length, 280);
              return (
                <div
                  key={skill.name}
                  className={`expertise__node expertise__node--${skill.category}`}
                  style={{
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    animationDelay: `${i * 0.1 + 1}s`
                  }}
                >
                  <span className="expertise__node-label">{skill.name}</span>
                  <div 
                    className="expertise__node-fill"
                    style={{ height: `${skill.proficiency}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Orbital Lines */}
          <svg className="expertise__lines" viewBox="-350 -350 700 700">
            <circle cx="0" cy="0" r="120" className="expertise__orbit-line" />
            <circle cx="0" cy="0" r="200" className="expertise__orbit-line" />
            <circle cx="0" cy="0" r="280" className="expertise__orbit-line" />
          </svg>
        </div>

        {/* Expertise Cards */}
        <div className={`expertise__cards ${inView ? 'expertise__cards--visible' : ''}`}>
          {expertiseCards.map((card, index) => (
            <div
              key={card.id}
              className={`expertise__card ${activeCard === card.id ? 'expertise__card--active' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card Number */}
              <span className="expertise__card-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Card Header */}
              <div className="expertise__card-header">
                <h3 className="expertise__card-title">
                  {card.title}
                  <em>{card.subtitle}</em>
                </h3>
                <div 
                  className="expertise__card-accent"
                  style={{ background: card.accent }}
                />
              </div>

              {/* Card Content */}
              <p className="expertise__card-description">{card.description}</p>

              {/* Skills List */}
              <div className="expertise__card-skills">
                {card.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="expertise__card-skill"
                    style={{ animationDelay: `${skillIndex * 0.05}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Card Border Glow */}
              <div 
                className="expertise__card-glow"
                style={{ background: `linear-gradient(135deg, ${card.accent}20, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="expertise__divider">
        <span className="expertise__divider-line" />
        <span className="expertise__divider-dot" />
        <span className="expertise__divider-line" />
      </div>
    </section>
  );
}

export default Expertise;
