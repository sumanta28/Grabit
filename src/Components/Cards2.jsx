import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import '../Styles/Card2.css'; 

import card1 from '../assets/Home/Cards2/card1.jpg';
import card2 from '../assets/Home/Cards2/card2.jpg';
import card3 from '../assets/Home/Cards2/card3.jpg';
import card4 from '../assets/Home/Cards2/card4.jpg';
import card5 from '../assets/Home/Cards2/card5.jpg';
import card6 from '../assets/Home/Cards2/card6.jpg';
import card7 from '../assets/Home/Cards2/card7.jpg';
import card8 from '../assets/Home/Cards2/card8.jpg';
import card9 from '../assets/Home/Cards2/card9.jpg';
import card10 from '../assets/Home/Cards2/card10.jpg';
import card11 from '../assets/Home/Cards2/card11.jpg';

const Cards2Tailwind = () => {
  const slides = useMemo(
    () => [
      { src: card1, id: 1, label: '' },
      { src: card2, id: 2, label: 'Lamp and lighting' },
      { src: card3, id: 3, label: 'Home Appliances' },
      { src: card4, id: 4, label: 'Article Flowers And Plants' },
      { src: card5, id: 5, label: 'Jewellery' },
      { src: card6, id: 6, label: 'Sunglasses' },
      { src: card7, id: 7, label: 'Dinner Sets' },
      { src: card8, id: 8, label: 'Gen Z Collections' },
      { src: card9, id: 9, label: 'Camera and Accessories' },
      { src: card10, id: 10, label: 'Kids Personal Care' },
      { src: card11, id: 11, label: 'HeadPhones' }
    ],
    []
  );


  const cardsPerGroup = 5; 
  const visibleMovingCards = Math.max(1, cardsPerGroup - 1);

  const fixedSlide = slides[0] ?? null;
  const movingSlides = slides.slice(1);

  const outerRef = useRef(null);
  const wrapperRef = useRef(null);


  const MAX_CARD_W = 420;
  const BASE_CARD_H = 560;
  const GAP = 28;


  const [cardW, setCardW] = useState(360);
  const [cardH, setCardH] = useState(480);
  const [visibleWidth, setVisibleWidth] = useState(
    visibleMovingCards * 360 + Math.max(0, visibleMovingCards - 1) * GAP
  );


  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const computeSizes = () => {
    const containerWidth = outerRef.current ? outerRef.current.clientWidth : window.innerWidth;

    const available = Math.max(420, containerWidth - 40);


    const totalGaps = (cardsPerGroup - 1) * GAP;
    const desiredCardW = Math.floor((available - totalGaps) / cardsPerGroup);

    const MIN_CARD_W = 200;
    const finalCardW = Math.max(MIN_CARD_W, Math.min(MAX_CARD_W, desiredCardW));
    const scale = finalCardW / MAX_CARD_W;
    const finalCardH = Math.round(BASE_CARD_H * scale);


    const movingTotalGaps = Math.max(0, visibleMovingCards - 1) * GAP;
    const finalVisibleWidth = visibleMovingCards * finalCardW + movingTotalGaps;


    const step = finalCardW + GAP;
    const computedMaxIndex = Math.max(0, movingSlides.length - visibleMovingCards);

    setCardW(finalCardW);
    setCardH(finalCardH);
    setVisibleWidth(finalVisibleWidth);
    setMaxIndex(computedMaxIndex);

    setCurrentIndex((ci) => Math.min(ci, computedMaxIndex));
  };

  useLayoutEffect(() => {
    computeSizes();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeSizes);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [movingSlides.length]); 

 
  const stepPx = cardW + GAP;
  const trackWidth = movingSlides.length * cardW + Math.max(0, movingSlides.length - 1) * GAP;

  const goToPrev = () => setCurrentIndex((p) => Math.max(0, p - 1));
  const goToNext = () => setCurrentIndex((p) => Math.min(maxIndex, p + 1));

  return (

    <section className="w-full" ref={outerRef} style={{ paddingTop: 48 }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div
          className="flex items-start gap-6 relative"
          style={{ height: `${cardH}px`, marginTop: 0 }}
        >
    
          <div
            className="relative rounded-3xl bg-white shadow-xl flex-shrink-0"
            style={{ width: `${cardW}px`, minWidth: `${cardW}px`, height: `${cardH}px` }}
          >
            {fixedSlide ? (
              <img
                src={fixedSlide.src}
                alt="promo"
                loading="lazy"
                className="w-full h-full object-cover rounded-3xl"
                style={{ objectPosition: 'center 18%' }}
              />
            ) : (
              <div className="w-full h-full" />
            )}

            <button
              aria-label="Previous"
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center focus:outline-none z-30"
              title="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-700">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

        
          <div
            ref={wrapperRef}
            className="relative overflow-hidden"
            style={{
              width: `${visibleWidth}px`,
              minWidth: `${visibleWidth}px`,
              height: `${cardH}px`,
              flex: '0 0 auto'
            }}
          >
            <div
              className="track-anim flex items-stretch"
              style={{
                transform: `translateX(-${currentIndex * stepPx}px)`,
                gap: `${GAP}px`,
                width: `${trackWidth}px`
              }}
            >
              
              {movingSlides.map((card) => (
                <article
                  key={card.id}
                  className="relative rounded-3xl overflow-hidden bg-white shadow-md"
                  style={{
                    width: `${cardW}px`,
                    height: `${cardH}px`,
                    minWidth: `${cardW}px`,
                    minHeight: `${cardH}px`,
                    flex: '0 0 auto'
                  }}
                  tabIndex={0}
                  aria-label={`card-${card.id}`}
                >
                  <img
                    src={card.src}
                    alt={`card-${card.id}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 12%' }}
                  />
                  {card.label ? (
                    <div className="absolute left-4 right-4 bottom-4 h-12 rounded-md bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-sm font-medium">
                      {card.label}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>

            <button
              aria-label="Next"
              onClick={goToNext}
              disabled={currentIndex === maxIndex}
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center focus:outline-none z-30"
              title="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-700">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards2Tailwind;
