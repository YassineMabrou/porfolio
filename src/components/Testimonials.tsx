import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../assets/styles/Testimonials.scss';

interface Testimonial {
  name: string;
  title: string;
  company: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Badii Gharbi',
    title: 'CEO',
    company: 'VNext Consulting',
    text: 'Yassine delivered exceptional work on our IoT project. His expertise in both frontend and backend development played a key role in the success of our platform.',
    avatar: 'BG'
  },
  {
    name: 'Leila Gazzeh',
    title: 'University Professor',
    company: 'ISITCom',
    text: 'Yassine studied Cloud Computing and Machine Learning under my supervision. He demonstrated strong analytical thinking and a solid understanding of modern cloud architectures and AI systems.',
    avatar: 'LG'
  },
  {
    name: 'Ridha Khelifi',
    title: 'CSO',
    company: 'VNext Consulting',
    text: 'Working with Yassine was a valuable experience. His ability to translate complex requirements into clean and scalable solutions is impressive.',
    avatar: 'RK'
  },
  {
    name: 'Sonia Mili',
    title: 'University Professor',
    company: 'ISITCom',
    text: 'Yassine completed the Computer Networking course under my supervision. He built a strong foundation in network architectures, protocols, and practical implementation.',
    avatar: 'SM'
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setDirection('next');
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length);
          setIsAnimating(false);
        }, 500);
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [isAnimating]);

  const goToPrevious = () => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={`testimonials ${inView ? 'testimonials--visible' : ''}`} ref={ref}>
      {/* Background */}
      <div className="testimonials__bg">
        <div className="testimonials__pattern" />
        <div className="testimonials__glow testimonials__glow--1" />
        <div className="testimonials__glow testimonials__glow--2" />
      </div>

      <div className="testimonials__container">
        {/* Header */}
        <div className="testimonials__header">
          <span className="testimonials__label">
            <span className="testimonials__label-line" />
            Testimonials
            <span className="testimonials__label-line" />
          </span>
          <h2 className="testimonials__title">
            Words of <em>Appreciation</em>
          </h2>
          <p className="testimonials__subtitle">
            Feedback from professors and professional collaborators
          </p>
        </div>

        {/* Carousel */}
        <div className="testimonials__carousel">
          {/* Quote Icon */}
          <div className="testimonials__quote">
            <FormatQuoteIcon />
          </div>

          {/* Content */}
          <div className={`testimonials__content ${isAnimating ? `testimonials__content--${direction}` : ''}`}>
            <p className="testimonials__text">
              "{currentTestimonial.text}"
            </p>

            <div className="testimonials__author">
              <div className="testimonials__avatar">
                {currentTestimonial.avatar}
              </div>
              <div className="testimonials__author-info">
                <h4 className="testimonials__author-name">{currentTestimonial.name}</h4>
                <p className="testimonials__author-title">{currentTestimonial.title}</p>
                <p className="testimonials__author-company">{currentTestimonial.company}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="testimonials__progress">
            <div 
              className="testimonials__progress-bar"
              style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
            />
          </div>

          {/* Navigation */}
          <div className="testimonials__nav">
            <button 
              className="testimonials__nav-btn"
              onClick={goToPrevious}
              aria-label="Previous testimonial"
            >
              <ArrowBackIcon />
            </button>

            <div className="testimonials__indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonials__indicator ${index === currentIndex ? 'testimonials__indicator--active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button 
              className="testimonials__nav-btn"
              onClick={goToNext}
              aria-label="Next testimonial"
            >
              <ArrowForwardIcon />
            </button>
          </div>

          {/* Counter */}
          <div className="testimonials__counter">
            <span className="testimonials__counter-current">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="testimonials__counter-separator">/</span>
            <span className="testimonials__counter-total">
              {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
