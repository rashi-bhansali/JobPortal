import React, { useEffect, useState } from "react";
import '../Styles/Home/Scroll.css';


export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 2000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && 
        <div onClick={scrollToTop} style={{display: isVisible ? 'inline' : 'none'}}>
          <h1 className="scrollup">&#8593;</h1>
        </div>}
    </div>
  );
}
