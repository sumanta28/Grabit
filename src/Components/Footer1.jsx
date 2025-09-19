// Footer1.jsx
import React from 'react';
import '../Styles/Footer1.css';

import deliveryIcon from '../assets/Home/delivery.png';
import returnIcon from '../assets/Home/return.png';
import secureIcon from '../assets/Home/secure.png';
import supportIcon from '../assets/Home/support.png';

const Footer1 = () => {
  const features = [
    {
      icon: deliveryIcon,
      title: "FREE DELIVERY",
      description: "Free Shipping On All Order"
    },
    {
      icon: supportIcon,
      title: "ONLINE SUPPORT 24/7",
      description: "Support Online 24 Hours A Day"
    },
    {
      icon: returnIcon,
      title: "EASY RETURN POLICY",
      description: "Back Guarantee Under 7 Days"
    },
    {
      icon: secureIcon,
      title: "SECURE PAYMENT",
      description: "100% Fast And Secure Payment"
    }
  ];

  return (
    <section className="footer1" aria-label="site features">
      <div className="footer1__inner">
        <div className="footer1__grid">
          {features.map((f, i) => (
            <div className="footer1__item" key={i}>
              <div className="footer1__icon-wrap">
                <img src={f.icon} alt={f.title} className="footer1__icon" />
              </div>
              <div className="footer1__content">
                <h3 className="footer1__title" title={f.title}>{f.title}</h3>
                <p className="footer1__desc">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer1;
