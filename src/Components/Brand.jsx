import React from "react";
import "../Styles/Brand.css";
import b1 from "../assets/Home/Brands/b1.png";
import b2 from "../assets/Home/Brands/b2.png";
import b3 from "../assets/Home/Brands/b3.png";
import b4 from "../assets/Home/Brands/b4.png";
import b5 from "../assets/Home/Brands/b5.png";
import b6 from "../assets/Home/Brands/b6.png";
import b7 from "../assets/Home/Brands/b7.png";
import b8 from "../assets/Home/Brands/b8.png";
import b9 from "../assets/Home/Brands/b9.png";
import b10 from "../assets/Home/Brands/b10.png";
import b11 from "../assets/Home/Brands/b11.png";

const images = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11];

export default function Brand({
  speed = 9,
  imgWidth = 220,   
  imgHeight = 150,  
}) {
  const doubled = [...images, ...images];

  const style = {
    "--scroll-duration": `${speed}s`,
    "--brand-img-width": `${imgWidth}px`,
    "--brand-img-height": `${imgHeight}px`,
  };

  return (
    <div className="w-full py-4" style={style}>
      <div className="brand-wrapper overflow-hidden">
        <div className="brand-track flex items-center gap-6 will-change-transform">
          {doubled.map((src, idx) => (
            <div
              className="brand-item flex-shrink-0 flex items-center justify-center px-2"
              key={idx}
              aria-hidden={idx >= images.length ? "true" : "false"}
            >
              <img
                src={src}
                alt={`brand-${(idx % images.length) + 1}`}
                loading="lazy"
                draggable="false"
                className="brand-img object-contain select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
