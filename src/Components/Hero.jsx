import React, { useState, useEffect } from 'react';
import '../Styles/Hero.css';
import banner1 from '../assets/Home/carousel/banner1.png';
import banner2 from '../assets/Home/carousel/banner2.png';
import banner3 from '../assets/Home/carousel/banner3.png';
import banner4 from '../assets/Home/carousel/banner4.png';
import banner5 from '../assets/Home/carousel/banner5.png';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: banner1,
      title: "Branded Women's",
      titleBreak: 'Styles',
      subtitle: 'Up To 50% Off',
      cta: '+ Explore',
    },
    {
      image: banner2,
      title: 'VogueNest',
      titleBreak: '',
      subtitle: '50-60% Off',
      cta: '+ Explore',
    },
    {
      image: banner3,
      title: 'Revamp Your Home With',
      titleBreak: 'Decor Items',
      subtitle: 'Discount up to 50%',
      cta: '+ Explore',
    },
    {
      image: banner4,
      title: 'Grab Gadgets',
      titleBreak: '',
      subtitle: 'Save big, up to 70% Off!',
      cta: '+ Explore',
    },
    {
      image: banner5,
      title: 'Glow More, Spendless',
      titleBreak: '',
      subtitle: 'Flat discount up to 45% & Free Gift',
      cta: '+ Explore',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  const wrapperStyle = {
    width: `${slides.length * 100}%`, 
    transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
  };

  const slideWidthPercent = 100 / slides.length;

  return (
    <section className="womenstyle">
      <div className="container">
        <div className="carousel-container">
          <div className="slides-wrapper" style={wrapperStyle}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className="slide"
                style={{ width: `${slideWidthPercent}%` }} 
              >
                <div className="slide-content">
                  <div className="image-container">
                    <img
                      src={slide.image}
                      alt={`banner-${index}`}
                      loading="lazy"
                      className="slide-image"
                    />
                  </div>
                  <div className="text-container">
                    <h1>
                      {slide.title}
                      {slide.titleBreak && (
                        <>
                          <br />
                          {slide.titleBreak}
                        </>
                      )}
                    </h1>
                    <h3>{slide.subtitle}</h3>
                    <h4>{slide.cta}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pagination">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
