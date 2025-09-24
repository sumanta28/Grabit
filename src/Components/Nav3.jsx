import React, { useState } from 'react';
import '../Styles/Nav3.css';
import {Link} from "react-router-dom"

const Nav3 = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const menuItems = {
    men: [
      'Topware',
      'Indian & Festive Ware',
      'Bottomware',
      'Footwear',
      'Fashion Accessories'
    ],
    women: [
      'Indian & Fusion ware',
      'Western & Indo-western ware',
      'Footwear',
      'Jwellery & Accessories',
      'Beauty and Personal Care'
    ],
    kids: [
      'Boys Clothing & Footwear',
      'Girls Clothing & Footwear',
      'Kids Accessories',
      'Toy & Games',
      'Kids Personal Care'
    ],
    homeDecor: [
      'Furniture & Storage',
      'Dining Decor',
      'Kitchen Decor',
      'Lamps & Lighting',
      'Indoor Plants'
    ],
    electronics: [
      'Mobile & Headphones',
      'Laptop & Desktop',
      'Smart wearables',
      'Camera & Accessories',
      'Home Appliances'
    ]
  };

  return (
    <nav className="navigationbar">
      <div className="container">
        <ul className="nav-Links1">
          <li 
            className={`dropdown ${activeDropdown === 'men' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('men')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="#">Men</Link>
            <ul className={`dropdown-content ${activeDropdown === 'men' ? 'show' : ''}`}>
              {menuItems.men.map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </li>
          
          <li 
            className={`dropdown ${activeDropdown === 'women' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('women')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="#">Women</Link>
            <ul className={`dropdown-content ${activeDropdown === 'women' ? 'show' : ''}`}>
              {menuItems.women.map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </li>
          
          <li 
            className={`dropdown ${activeDropdown === 'kids' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('kids')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="#">Kids</Link>
            <ul className={`dropdown-content ${activeDropdown === 'kids' ? 'show' : ''}`}>
              {menuItems.kids.map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </li>
          
          <li 
            className={`dropdown ${activeDropdown === 'homeDecor' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('homeDecor')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="#">Home Decor</Link>
            <ul className={`dropdown-content ${activeDropdown === 'homeDecor' ? 'show' : ''}`}>
              {menuItems.homeDecor.map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </li>
          
          <li 
            className={`dropdown ${activeDropdown === 'electronics' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('electronics')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="#">Electronics</Link>
            <ul className={`dropdown-content ${activeDropdown === 'electronics' ? 'show' : ''}`}>
              {menuItems.electronics.map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </li>

          <div className="vendor">
            <li><Link to="#">Become a Vendor</Link></li>
            <li><Link to="#">Download App</Link></li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav3;