import React, { useState, useEffect } from 'react';
import './BannerSlider.css';
import banner_one from '../../assets/billboard-1.png';
import banner_two from '../../assets/billboard-2.png';
import banner_open_house from '../../assets/billboard-3.png';
import banner_evaluation from '../../assets/billboard-4.png';

const BannerSlider = () => {
  const [selected, setSelected] = useState(1);
  
  const images = [
    banner_open_house,
    banner_evaluation,
    banner_one
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prevSelected) => (prevSelected % images.length) + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slides">
          {images.map((image, index) => (
            <div key={index} className={`slide ${selected === index + 1 ? 'active' : ''}`}>
              <img src={image} alt="" style={{ width: '100%' }} />
            </div>
          ))}
          {/* <div className="navigation-auto">
            {images.map((_, index) => (
              <div key={index} className={`auto-btn ${selected === index + 1 ? 'active' : ''}`}></div>
            ))}
          </div> */}
        </div>
        <div className="navigation-manual">
          {images.map((_, index) => (
            <label key={index} className={`manual-btn ${selected === index + 1 ? 'active' : ''}`} onClick={() => setSelected(index + 1)}></label>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default BannerSlider;