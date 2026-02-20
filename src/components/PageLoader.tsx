import React, { useEffect, useState } from 'react';
import '../assets/styles/PageLoader.scss';

interface PageLoaderProps {
  onLoadComplete?: () => void;
}

function PageLoader({ onLoadComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // 2 seconds
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment + Math.random() * 2;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Small delay before exit animation
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onLoadComplete?.();
          }, 800);
        }, 400);
      }, 300);
    }
  }, [progress, onLoadComplete]);

  if (isExiting) {
    return (
      <div className="page-loader page-loader--exiting">
        <div className="page-loader__curtain page-loader__curtain--left" />
        <div className="page-loader__curtain page-loader__curtain--right" />
      </div>
    );
  }

  return (
    <div className={`page-loader ${isComplete ? 'page-loader--complete' : ''}`}>
      {/* Background */}
      <div className="page-loader__bg">
        <div className="page-loader__grain" />
      </div>

      {/* Content */}
      <div className="page-loader__content">
        {/* Logo/Brand */}
        <div className="page-loader__brand">
          <div className="page-loader__logo">
            <span className="page-loader__logo-letter">Y</span>
            <span className="page-loader__logo-letter">M</span>
          </div>
          <div className="page-loader__tagline">
            <span>Full Stack Developer</span>
          </div>
        </div>

        {/* Progress */}
        <div className="page-loader__progress">
          <div className="page-loader__progress-track">
            <div 
              className="page-loader__progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="page-loader__progress-info">
            <span className="page-loader__progress-text">Loading</span>
            <span className="page-loader__progress-value">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="page-loader__decorative">
          <span className="page-loader__year">2024</span>
          <span className="page-loader__line" />
          <span className="page-loader__location">Morocco</span>
        </div>
      </div>

      {/* Corner Elements */}
      <div className="page-loader__corner page-loader__corner--tl" />
      <div className="page-loader__corner page-loader__corner--tr" />
      <div className="page-loader__corner page-loader__corner--bl" />
      <div className="page-loader__corner page-loader__corner--br" />
    </div>
  );
}

export default PageLoader;
