import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/CustomCursor.scss';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  hoverText: string;
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    hoverText: ''
  });

  useEffect(() => {
    // Check if device has touch (hide cursor on mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseDown = () => {
      setCursor(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursor(prev => ({ ...prev, isClicking: false }));
    };

    // Handle hover states for interactive elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const hoverText = target.getAttribute('data-cursor-text') || '';
      setCursor(prev => ({ ...prev, isHovering: true, hoverText }));
    };

    const handleMouseLeave = () => {
      setCursor(prev => ({ ...prev, isHovering: false, hoverText: '' }));
    };

    // Animation loop for smooth following
    const animate = () => {
      // Smooth lerp for outer cursor
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      // Faster lerp for inner dot
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }

      requestAnimationFrame(animate);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [data-cursor-hover], .projects__card, .expertise__card, .expertise__node'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Start animation loop
    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Re-attach listeners when DOM changes (for dynamic content)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [data-cursor-hover], .projects__card, .expertise__card, .expertise__node'
      );

      const handleMouseEnter = (e: Event) => {
        const target = e.target as HTMLElement;
        const hoverText = target.getAttribute('data-cursor-text') || '';
        setCursor(prev => ({ ...prev, isHovering: true, hoverText }));
      };

      const handleMouseLeave = () => {
        setCursor(prev => ({ ...prev, isHovering: false, hoverText: '' }));
      };

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className={`custom-cursor ${cursor.isHovering ? 'custom-cursor--hover' : ''} ${cursor.isClicking ? 'custom-cursor--click' : ''}`}
      >
        <div className="custom-cursor__ring" />
        {cursor.hoverText && (
          <span className="custom-cursor__text">{cursor.hoverText}</span>
        )}
      </div>
      <div 
        ref={cursorDotRef}
        className={`custom-cursor__dot ${cursor.isClicking ? 'custom-cursor__dot--click' : ''}`}
      />
    </>
  );
}

export default CustomCursor;
