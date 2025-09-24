import React from "react";
import "../Styles/Nav1.css";
import {Link} from "react-router-dom"

const Nav1 = () => {
  return (
    <div className="heading">
      <div className="container">
        <ul className="nav-bar">
          <div className="nav-first">
            <li><Link to="#">Free shipping on orders over 499</Link></li>
            <li><a href="#">24/7 Customer Support</a></li>
          </div>

          <div className="nav-end">
            <li><Link to="#">Track Order</Link></li>
            <li><Link to="#">Help</Link></li>
            <li><Link to="#">Sell on Grabit</Link></li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Nav1;
