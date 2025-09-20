import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import '../Styles/Cards.css';
import card1 from '../assets/Home/Cards/card1.png';
import card2 from '../assets/Home/Cards/card2.png';
import card3 from '../assets/Home/Cards/card3.png';
import card4 from '../assets/Home/Cards/card4.png';
import card5 from '../assets/Home/Cards/card5.png';
import card6 from '../assets/Home/Cards/card6.png';
import card7 from '../assets/Home/Cards/card7.png';
import card8 from '../assets/Home/Cards/card8.png';
import card9 from '../assets/Home/Cards/card9.png';
import card10 from '../assets/Home/Cards/card10.png';
import card11 from '../assets/Home/Cards/card11.png';
import card12 from '../assets/Home/Cards/card12.png';

const Cards = () => {
  const slides = useMemo(
    () => [
      { src: card1, id: 1 },
      { src: card2, id: 2 },
      { src: card3, id: 3 },
      { src: card4, id: 4 },
      { src: card5, id: 5 },
      { src: card6, id: 6 },
      { src: card7, id: 7 },
      { src: card8, id: 8 },
      { src: card9, id: 9 },
      { src: card10, id: 10 },
      { src: card11, id: 11 },
      { src: card12, id: 12 }
    ],
    []
  );

  const cardsPerGroup = 4;
  const groups = useMemo(() => {
    const out = [];
    for (let i = 0; i < slides.length; i += cardsPerGroup) out.push(slides.slice(i, i + cardsPerGroup));
    return out;
  }, [slides]);

  const wrapperRef = useRef(null);

 
  const MAX_CARD_W = 446; 
  const BASE_CARD_H = 600; 
  const GAP = 32; 
  const HORIZONTAL_MARGIN = 64; 

  
  const [cardW, setCardW] = useState(MAX_CARD_W);
  const [cardH, setCardH] = useState(BASE_CARD_H);
  const [visibleWidth, setVisibleWidth] = useState(cardsPerGroup * MAX_CARD_W + (cardsPerGroup - 1) * GAP);

  
  const computeSizes = () => {
    const viewportTotal = Math.max(320, window.innerWidth - HORIZONTAL_MARGIN); 
    const totalGaps = (cardsPerGroup - 1) * GAP;
    
    const desiredCardW = Math.floor((viewportTotal - totalGaps) / cardsPerGroup);

    const MIN_CARD_W = 220;
    const finalCardW = Math.max(MIN_CARD_W, Math.min(MAX_CARD_W, desiredCardW));
    const scale = finalCardW / MAX_CARD_W;
    const finalCardH = Math.round(BASE_CARD_H * scale);
    const finalVisibleWidth = cardsPerGroup * finalCardW + totalGaps;

    setCardW(finalCardW);
    setCardH(finalCardH);
    setVisibleWidth(finalVisibleWidth);
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
  }, []); 


  const [currentGroup, setCurrentGroup] = useState(0);
  const [isPaused, setIsPaused] = useState(false);


  React.useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setCurrentGroup((p) => (p + 1) % groups.length), 4000);
    return () => clearInterval(id);
  }, [groups.length, isPaused]);

  const trackWidth = groups.length * visibleWidth;

  return (
    <section className="cards-fixed-section" aria-label="Next Gen Stars">
      <div className="cards-header">
        <h2 className="cards-title">NEXT GEN STARS</h2>
      </div>

      <div
        className="cards-viewport"
        ref={wrapperRef}
        style={{
          width: `${visibleWidth}px`,
          minWidth: `${visibleWidth}px`
          
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="cards-track"
          style={{
            transform: `translateX(-${currentGroup * visibleWidth}px)`,
            gap: `${GAP}px`,
            width: `${trackWidth}px`,
            transition: 'transform 300ms ease'
          }}
        >
          {groups.map((group, gi) => (
            <div
              className="cards-group"
              key={gi}
              style={{ gap: `${GAP}px`, minWidth: `${visibleWidth}px` }}
            >
              {group.map((card) => (
                <article
                  className="cards-card"
                  key={card.id}
                  style={{
                    width: `${cardW}px`,
                    height: `${cardH}px`,
                    borderRadius: '20px'
                  }}
                  tabIndex={0}
                  aria-label={`card-${card.id}`}
                >
                  <div className="cards-image">
                    <img src={card.src} alt={`card-${card.id}`} loading="lazy" />
                  </div>
                </article>
              ))}

              {Array.from({ length: Math.max(0, cardsPerGroup - group.length) }).map((_, i) => (
                <div key={i} style={{ width: `${cardW}px`, height: `${cardH}px`, opacity: 0 }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="cards-dots" role="tablist" aria-label="Slide groups">
        {groups.map((_, i) => (
          <button
            key={i}
            className={`dot ${currentGroup === i ? 'active' : ''}`}
            onClick={() => setCurrentGroup(i)}
            aria-label={`Go to group ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Cards;
