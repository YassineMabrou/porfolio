import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../assets/styles/ScrollToTop.scss';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <Fab
          color="primary"
          size="large"
          onClick={scrollToTop}
          className="fab-button"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </div>
  );
}

export default ScrollToTop;
