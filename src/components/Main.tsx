import React, { useEffect, useState, useRef } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EmailIcon from '@mui/icons-material/Email';
import '../assets/styles/Main.scss';
import avatar from '../assets/images/avatar.jpg';

function Main() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToExpertise = () => {
    const expertiseSection = document.getElementById('expertise');
    if (expertiseSection) {
      expertiseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" ref={heroRef}>
      {/* Animated background elements */}
      <div className="hero__background">
        <div 
          className="hero__gradient-orb hero__gradient-orb--1"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        />
        <div 
          className="hero__gradient-orb hero__gradient-orb--2"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      {/* Floating decorative elements */}
      <div className="hero__decorations">
        <span className="hero__deco hero__deco--1">●</span>
        <span className="hero__deco hero__deco--2">◆</span>
        <span className="hero__deco hero__deco--3">○</span>
        <div className="hero__line hero__line--1" />
        <div className="hero__line hero__line--2" />
      </div>

      <div className={`hero__content ${isVisible ? 'hero__content--visible' : ''}`}>
        {/* Top label */}
        <div className="hero__label">
          <span className="hero__label-line" />
          <span className="hero__label-text">Full-Stack Developer & AI Engineer</span>
          <span className="hero__label-line" />
        </div>

        {/* Main heading with dramatic typography */}
        <div className="hero__heading">
          <h1 className="hero__title">
            <span className="hero__title-line hero__title-line--1">
              <span className="hero__title-word">Yassine</span>
            </span>
            <span className="hero__title-line hero__title-line--2">
              <span className="hero__title-word hero__title-word--italic">Mabrouk</span>
            </span>
          </h1>
        </div>

        {/* Avatar with glow effect */}
        <div className="hero__avatar-wrapper">
          <div className="hero__avatar-glow" />
          <div className="hero__avatar-ring" />
          <img src={avatar} alt="Yassine Mabrouk" className="hero__avatar" />
          <div className="hero__avatar-badge">
            <span className="hero__avatar-badge-dot" />
            Available for work
          </div>
        </div>

        {/* Tagline */}
        <p className="hero__tagline">
          Crafting intelligent digital experiences at the intersection of
          <span className="hero__tagline-highlight"> MERN Stack</span>,
          <span className="hero__tagline-highlight"> AI</span>, and
          <span className="hero__tagline-highlight"> IoT</span>
        </p>

        {/* CTA Buttons */}
        <div className="hero__actions">
          <a 
            href="mailto:yassine.mabrouk@example.com" 
            className="hero__btn hero__btn--primary"
          >
            <EmailIcon />
            <span>Get in Touch</span>
            <span className="hero__btn-shine" />
          </a>
          <div className="hero__social">
            <a 
              href="https://github.com/YassineMabrou" 
              target="_blank" 
              rel="noreferrer"
              className="hero__social-link"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a 
              href="https://www.linkedin.com/in/yassinemabroukkk/" 
              target="_blank" 
              rel="noreferrer"
              className="hero__social-link"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <button className="hero__scroll" onClick={scrollToExpertise} aria-label="Scroll down">
          <span className="hero__scroll-text">Scroll</span>
          <span className="hero__scroll-line">
            <ArrowDownwardIcon />
          </span>
        </button>
      </div>

      {/* Side text */}
      <div className="hero__side-text hero__side-text--left">
        <span>PORTFOLIO 2024</span>
      </div>
      <div className="hero__side-text hero__side-text--right">
        <span>BASED IN MOROCCO</span>
      </div>
    </section>
  );
}

export default Main;
