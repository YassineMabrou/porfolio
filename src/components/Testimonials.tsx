import React, { useState, useEffect } from 'react';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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
    company: 'Vnext Consulting Company',
    text: 'Yassine delivered exceptional work on our IoT project. His expertise in both frontend and backend development was crucial to our success. Highly recommend!',
    avatar: '👨‍💼'
  },
  {
    
    name: 'Leila Gazzeh',
    title: 'University Professor',
    company: 'Isitcom',
    text: 'Outstanding developer with deep knowledge of AI and IoT integration. The solutions he provided were scalable and well-architected. A true professional.',
    avatar: '👩‍💼'
  },
  {
    name: 'Ridha Khelifi',
    title: 'CSO',
    company: 'Vnext Consulting Company',
    text: 'Working with Yassine was a game-changer for our platform. His ability to understand complex requirements and deliver clean code is impressive.',
    avatar: '👨‍💻'
  },
  {
    name: 'Sonia Mili',
    title: 'University Professor',
    company: 'Isitcom',
    text: 'Great communication skills and attention to detail. Yassine consistently delivered features on time with high quality. Looking forward to future collaborations.',
    avatar: '👩‍🔬'
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <div className="testimonials-container">
      <div className="testimonials-content">
        <h2>What People Say</h2>
        <p className="subtitle">Feedback from colleagues and clients</p>

        <div className="testimonials-carousel">
          <div className="carousel-inner">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-slide ${index === currentIndex ? 'active' : ''}`}
              >
                <div className="testimonial-card">
                  <FormatQuoteIcon className="quote-icon" />
                  <p className="testimonial-text">{testimonial.text}</p>
                  
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.avatar}</div>
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p className="author-title">{testimonial.title}</p>
                      <p className="author-company">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            className="carousel-button prev"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <NavigateBeforeIcon />
          </button>
          <button
            className="carousel-button next"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <NavigateNextIcon />
          </button>
        </div>

        {/* Indicators */}
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
