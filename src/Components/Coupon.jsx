import React from "react";
import "../Styles/Coupon.css"; 

import couponIcon from "../assets/coupon.png";

export default function Coupon() {
  return (
    <section className="w-full box-border">
      <div
        className="
          flex items-center justify-between
          w-full rounded-[20px]
          bg-gradient-to-r from-[#CFC7FF] to-[#EAE6FF]
          border border-black/10
        "
        style={{
          height: '180px',
          paddingTop: '20px',
          paddingRight: '16px',
          paddingBottom: '12px',
          paddingLeft: '16px'
        }}
        role="region"
        aria-label="Promotional coupon"
      >

        <div 
          className="flex items-center justify-center rounded-[20px]"
          style={{
            width: '160px',
            height: '140px',
            gap: '8px'
          }}
        >
          <img
            src={couponIcon}
            alt="Discount coupon icon"
            className="w-full h-full object-contain drop-shadow-[6px_6px_12px_rgba(0,0,0,0.25)]"
          />
        </div>


        <div className="flex items-center gap-6 text-center flex-1 justify-center">
          <h2 className="font-dm-serif text-5xl lg:text-6xl text-[#EC6325] leading-none whitespace-nowrap">
            Extra 20% Off
          </h2>
          <h3 className="font-semibold text-lg lg:text-4xl text-[#0b2540] whitespace-nowrap">
            On Your First Purchase
          </h3>
        </div>

        {/* Right Side: Button Container - Responsive */}
        <div className="flex-shrink-0">
          <button
            type="button"
            className="
              flex items-center rounded-[20px]
              bg-[#EEF1F8] shadow-[6px_6px_10px_rgba(0,0,0,0.2)]
              transition-transform hover:scale-105
            "
            style={{
              width: '320px',
              height: '65px',
              gap: '8px',
              paddingTop: '12px',
              paddingRight: '12px',
              paddingBottom: '12px',
              paddingLeft: '12px'
            }}
            aria-label="Copy coupon code EXTRA20%"
          >
            <span className="text-2xl font-bold text-[#EC6325] whitespace-nowrap flex-1 text-center">
              USE CODE
            </span>
            <span className="text-3xl font-extrabold text-[#0b2540] whitespace-nowrap flex-1 text-center">
              EXTRA20%
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}