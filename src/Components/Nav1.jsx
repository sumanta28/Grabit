import React from "react";
import "../Styles/Nav1.css";

const Nav1 = () => {
  return (
    <div className="heading">
      <div className="container">
        <ul className="nav-bar">
          <div className="nav-first">
            <li><a href="#">Free shipping on orders over 499</a></li>
            <li><a href="#">24/7 Customer Support</a></li>
          </div>

          <div className="nav-end">
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Sell on Grabit</a></li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Nav1;
