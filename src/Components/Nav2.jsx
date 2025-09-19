import React from "react";
import "../Styles/Nav2.css";
import logo from "../assets/Home/logo.png";
import { Search, User, Bell, Heart, ShoppingCart } from "lucide-react";

const Nav2 = () => {
  return (
    <header className="searchbar">
      <div className="container">
        <div className="content">
       
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Grabit logo" loading="lazy" />
            </a>
          </div>

          <form
            className="search"
            role="search"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Site search"
          >
            <input
              type="text"
              placeholder="Search products, brands, vendors....."
              aria-label="Search products"
            />
            <button
              className="search-btn"
              type="submit"
              aria-label="Submit search"
              title="Search"
            >
              <Search size={18} strokeWidth={2} className="nav-icon" />
            </button>
          </form>

          
          <nav className="myaccount" aria-label="User menu">
            <ul className="nav-links">
              <li>
                <a href="#" aria-label="Account">
                  <User size={22} strokeWidth={1.8} className="nav-icon" />
                  <span>Account</span>
                </a>
              </li>

              <li>
                <a href="#" aria-label="Notification">
                  <Bell size={22} strokeWidth={1.8} className="nav-icon" />
                  <span>Notification</span>
                </a>
              </li>

              <li>
                <a href="#" aria-label="Wishlist">
                  <Heart size={22} strokeWidth={1.8} className="nav-icon" />
                  <span>Wishlist</span>
                </a>
              </li>

              <li>
                <a href="#" aria-label="Cart">
                  <ShoppingCart
                    size={22}
                    strokeWidth={1.8}
                    className="nav-icon"
                  />
                  <span>Add to Cart</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Nav2;
