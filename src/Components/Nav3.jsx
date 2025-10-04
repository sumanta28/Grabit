// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../Styles/Nav3.css";

// const Nav3 = () => {
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const handleMouseEnter = (dropdown) => setActiveDropdown(dropdown);
//   const handleMouseLeave = () => setActiveDropdown(null);

//   const menuItems = {
//     men: [
//       "Topware",
//       "Indian & Festive Ware",
//       "Bottomware",
//       "Footwear",
//       "Fashion Accessories",
//     ],
//     women: [
//       "Indian & Fusion ware",
//       "Western & Indo-western ware",
//       "Footwear",
//       "Jwellery & Accessories",
//       "Beauty and Personal Care",
//     ],
//     kids: [
//       "Boys Clothing & Footwear",
//       "Girls Clothing & Footwear",
//       "Kids Accessories",
//       "Toy & Games",
//       "Kids Personal Care",
//     ],
//     homeDecor: [
//       "Furniture & Storage",
//       "Dining Decor",
//       "Kitchen Decor",
//       "Lamps & Lighting",
//       "Indoor Plants",
//     ],
//     electronics: [
//       "Mobile & Headphones",
//       "Laptop & Desktop",
//       "Smart wearables",
//       "Camera & Accessories",
//       "Home Appliances",
//     ],
//   };

//   const formatPath = (category, item) => {
//     const cat = category.toLowerCase();
//     const sub = item.replace(/\s+/g, "-").toLowerCase();
//     return `/category/${cat}/${sub}`;
//   };

//   return (
//     <nav className="navigationbar">
//       <div className="container">
//         <ul className="nav-links1">
//           {Object.keys(menuItems).map((category) => (
//             <li
//               key={category}
//               className={`dropdown ${activeDropdown === category ? "active" : ""}`}
//               onMouseEnter={() => handleMouseEnter(category)}
//               onMouseLeave={handleMouseLeave}
//             >
//               <Link to={`/category/${category.toLowerCase()}`}>
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </Link>
//               <ul
//                 className={`dropdown-content ${
//                   activeDropdown === category ? "show" : ""
//                 }`}
//               >
//                 {menuItems[category].map((item, index) => (
//                   <li key={index}>
//                     <Link to={formatPath(category, item)}>{item}</Link>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}

//           <div className="vendor">
//             <li>
//               <Link to="#">Become a Vendor</Link>
//             </li>
//             <li>
//               <Link to="#">Download App</Link>
//             </li>
//           </div>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Nav3;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Nav3.css";

const Nav3 = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (dropdown) => setActiveDropdown(dropdown);
  const handleMouseLeave = () => setActiveDropdown(null);

  const menuItems = {
    men: [
      "Topware",
      "Indian & Festive Ware",
      "Bottomware",
      "Footwear",
      "Fashion Accessories",
    ],
    women: [
      "Indian & Fusion ware",
      "Western & Indo-western ware",
      "Footwear",
      "Jwellery & Accessories",
      "Beauty and Personal Care",
    ],
    kids: [
      "Boys Clothing & Footwear",
      "Girls Clothing & Footwear",
      "Kids Accessories",
      "Toy & Games",
      "Kids Personal Care",
    ],
    homeDecor: [
      "Furniture & Storage",
      "Dining Decor",
      "Kitchen Decor",
      "Lamps & Lighting",
      "Indoor Plants",
    ],
    electronics: [
      "Mobile & Headphones",
      "Laptop & Desktop",
      "Smart wearables",
      "Camera & Accessories",
      "Home Appliances",
    ],
  };

  // ✅ Function to format URLs consistently
  const formatPath = (category, item) => {
    const cat = category.toLowerCase();
    // replace special chars (&), multiple spaces, then replace spaces with hyphens
    const sub = item
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, " ")         // collapse multiple spaces
      .trim()
      .replace(/\s+/g, "-");        // convert spaces to hyphen

    return `/category/${cat}/${sub}`;
  };

  return (
    <nav className="navigationbar">
      <div className="container">
        <ul className="nav-links1">
          {Object.keys(menuItems).map((category) => (
            <li
              key={category}
              className={`dropdown ${activeDropdown === category ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={`/category/${category.toLowerCase()}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
              <ul
                className={`dropdown-content ${
                  activeDropdown === category ? "show" : ""
                }`}
              >
                {menuItems[category].map((item, index) => (
                  <li key={index}>
                    <Link to={formatPath(category, item)}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <div className="vendor">
            <li>
              <Link to="#">Become a Vendor</Link>
            </li>
            <li>
              <Link to="#">Download App</Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav3;
