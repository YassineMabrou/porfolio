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
    company: 'VNext Consulting',
    text: 'Yassine delivered exceptional work on our IoT project. His expertise in both frontend and backend development played a key role in the success of our platform.',
    avatar: '👨‍💼'
  },
  {
    name: 'Leila Gazzeh',
    title: 'University Professor',
    company: 'ISITCom',
    text: 'Yassine studied Cloud Computing and Machine Learning under my supervision. He demonstrated strong analytical thinking and a solid understanding of modern cloud architectures and AI systems.',
    avatar: '👩‍🏫'
  },
  {
    name: 'Ridha Khelifi',
    title: 'CSO',
    company: 'VNext Consulting',
    text: 'Working with Yassine was a valuable experience. His ability to translate complex requirements into clean and scalable solutions is impressive.',
    avatar: '👨‍💻'
  },
  {
    name: 'Sonia Mili',
    title: 'University Professor',
    company: 'ISITCom',
    text: 'Yassine completed the Computer Networking course under my supervision. He built a strong foundation in network architectures, protocols, and practical implementation.',
    avatar: '👩‍🏫'
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="testimonials-container">
      <div className="testimonials-content">
        <h2>Academic & Professional References</h2>
        <p className="subtitle">
          Feedback from professors and professional collaborators
        </p>

        <div className="testimonials-carousel">
          <div className="carousel-inner">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-slide ${
                  index === currentIndex ? 'active' : ''
                }`}
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

        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${
                index === currentIndex ? 'active' : ''
              }`}
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