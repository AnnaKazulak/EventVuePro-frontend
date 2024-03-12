import { useState, useEffect } from 'react';
import './button.css';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to show or hide the button based on scroll position
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener to show/hide button
    window.addEventListener('scroll', toggleVisibility);

    // Remove scroll event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  };

  return (
    <div className={`scroll-to-top-button ${isVisible ? 'show' : 'hide'}`}>
      <button onClick={scrollToTop}>
      <i className="fa-solid fa-angles-up"></i>
      </button>
    </div>
  );
}

export default ScrollToTopButton;
