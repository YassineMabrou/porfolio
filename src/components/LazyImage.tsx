import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/LazyImage.scss';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
}

function LazyImage({ src, alt, className = '', width = '100%' }: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = imageWrapperRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            if (currentRef) {
              observer.unobserve(currentRef);
            }
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '50px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src]);

  return (
    <div className="lazy-image-wrapper" ref={imageWrapperRef}>
      {isLoading && <div className="image-skeleton"></div>}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`lazy-image ${className} ${!isLoading ? 'loaded' : ''}`}
          width={width}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}

export default LazyImage;
