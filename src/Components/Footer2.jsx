import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "../assets/logo.png"; 
import "../Styles/Footer2.css";

const Footer2 = () => {
  return (
    <footer className="footer-bg text-white font-['Raleway',sans-serif]">
      <div className="container max-w-7xl mx-auto px-6 py-8">
      
        <div className="grid grid-cols-12 gap-8 items-start">
        
          <div className="col-span-12 md:col-span-2">
            <img src={logo} alt="Grabit Logo" className="logo-img" />
            <p className="desc mt-4">
              Your one-stop destination for fashion, electronics, and everything in between.
            </p>
          </div>

    
          <div className="col-span-12 md:col-span-3">
            <h3 className="col-heading">CUSTOMER SERVICE</h3>
            <ul className="col-list">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Track Your Order</a></li>
              <li><a href="#">Return & Refund</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

    
          <div className="col-span-12 md:col-span-2">
            <h3 className="col-heading">ABOUT</h3>
            <ul className="col-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Feedback</a></li>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Vendor Guideline</a></li>
            </ul>
          </div>

      
          <div className="col-span-12 md:col-span-2">
            <h3 className="col-heading">LEGAL</h3>
            <ul className="col-list">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Term Of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>


          <div className="col-span-12 md:col-span-3">
            <h3 className="col-heading newsletter-heading">
              JOIN OUR NEWSLETTER 
            </h3>

            <p className="newsletter-para text-gray-300 mb-4">
              Get E-mail updates
         
            </p>

            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your Email Address"
                aria-label="email"
                className="subscribe-input"
              />
            
              <button className="subscribe-btn">Subscribe</button>
            </form>

            <h4 className="col-heading small-heading mt-6">KEEP IN TOUCH</h4>
            <div className="social-row mt-3">
              <a href="#" className="social-circle fb" aria-label="facebook"><Facebook className="icon" /></a>
              <a href="#" className="social-circle ig" aria-label="instagram"><Instagram className="icon" /></a>
              <a href="#" className="social-circle tw" aria-label="twitter"><Twitter className="icon" /></a>
              <a href="#" className="social-circle pin" aria-label="pinterest"><span className="p-letter">P</span></a>
              <a href="#" className="social-circle yt" aria-label="youtube"><Youtube className="icon" /></a>
            </div>
          </div>
        </div>

    
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-gray-400 text-sm copyright">
              © 2025 Grabit e commerce Pvt Limited . All rights reserved.
            </div>

            <div className="flex items-center gap-4 payments-row">
              <span className="text-gray-400 text-sm hidden sm:inline">We Accepted:</span>
              <div className="flex items-center gap-2">
                <div className="payment-badge visa">VISA</div>
                <div className="payment-badge rupay">RuPay</div>
                <div className="payment-badge discover">DISCOVER</div>
                <div className="payment-badge paypal">PayPal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
