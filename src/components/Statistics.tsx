import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import '../assets/styles/Statistics.scss';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

const stats: StatItem[] = [
  { label: 'Projects', value: 9, suffix: '+', description: 'Completed' },
  { label: 'Years', value: 2, suffix: '+', description: 'Experience' },
  { label: 'Lines', value: 50, suffix: 'K+', description: 'Code Written' },
  { label: 'Technologies', value: 25, suffix: '+', description: 'Mastered' },
];

const Counter: React.FC<{ target: number; duration?: number; suffix?: string; inView: boolean }> = ({ 
  target, 
  duration = 2000, 
  suffix = '',
  inView 
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(false);

  useEffect(() => {
    if (!inView || countRef.current) return;

    countRef.current = true;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span className="statistics__value">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

function Statistics() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className={`statistics ${inView ? 'statistics--visible' : ''}`} ref={ref}>
      {/* Background Elements */}
      <div className="statistics__bg">
        <div className="statistics__line statistics__line--1" />
        <div className="statistics__line statistics__line--2" />
        <div className="statistics__glow" />
      </div>

      <div className="statistics__container">
        {/* Left Side - Label */}
        <div className="statistics__header">
          <span className="statistics__label">
            <span className="statistics__label-dot" />
            Impact
          </span>
          <h2 className="statistics__title">
            By The<br /><em>Numbers</em>
          </h2>
          <p className="statistics__subtitle">
            Metrics that reflect my dedication to craft and continuous growth
          </p>
        </div>

        {/* Stats Grid */}
        <div className="statistics__grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="statistics__card"
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
            >
              <span className="statistics__card-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              <div className="statistics__card-content">
                <Counter 
                  target={stat.value} 
                  suffix={stat.suffix} 
                  inView={inView}
                />
                <div className="statistics__card-label">
                  <span className="statistics__card-primary">{stat.label}</span>
                  <span className="statistics__card-secondary">{stat.description}</span>
                </div>
              </div>

              <div className="statistics__card-line" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Bottom */}
      <div className="statistics__footer">
        <span className="statistics__footer-line" />
        <span className="statistics__footer-text">Performance Metrics</span>
        <span className="statistics__footer-line" />
      </div>
    </section>
  );
}

export default Statistics;
