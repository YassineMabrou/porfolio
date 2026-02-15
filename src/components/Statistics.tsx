import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import '../assets/styles/Statistics.scss';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon?: string;
}

const stats: StatItem[] = [
  { label: 'Projects Completed', value: 8, suffix: '+' },
  { label: 'Years of Experience', value: 2, suffix: '+' },
  { label: 'Lines of Code Written', value: 50000, suffix: '+' },
  { label: 'Technologies Mastered', value: 25, suffix: '+' },
];

const Counter: React.FC<{ target: number; duration?: number; suffix?: string }> = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
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
    <div ref={ref} className="counter">
      <span className="counter-value">
        {count.toLocaleString()}{suffix}
      </span>
    </div>
  );
};

function Statistics() {
  return (
    <div className="statistics-container">
      <div className="statistics-content">
        <h2>By The Numbers</h2>
        <p className="subtitle">My journey as a developer at a glance</p>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
