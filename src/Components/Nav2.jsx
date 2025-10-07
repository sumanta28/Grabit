// // import React from "react";
// // import "../Styles/Nav2.css";
// // import logo from "../assets/Home/logo.png";
// // import { Search, User, Bell, Heart, ShoppingCart } from "lucide-react";
// // import { Link } from "react-router-dom";


// // const Nav2 = () => {
// //   return (
// //     <header className="searchbar">
// //       <div className="container">
// //         <div className="content">

// //           <div className="logo">
// //             <Link to="/">
// //               <img src={logo} alt="Grabit logo" loading="lazy" />
// //             </Link>
// //           </div>

// //           <form
// //             className="search"
// //             role="search"
// //             onSubmit={(e) => e.preventDefault()}
// //             aria-label="Site search"
// //           >
// //             <input
// //               type="text"
// //               placeholder="Search products, brands, vendors....."
// //               aria-label="Search products"
// //             />
// //             <button
// //               className="search-btn"
// //               type="submit"
// //               aria-label="Submit search"
// //               title="Search"
// //             >
// //               <Search size={18} strokeWidth={2} className="nav-icon" />
// //             </button>
// //           </form>


// //           <nav className="myaccount" aria-label="User menu">
// //             <ul className="nav-links">
// //               <li>
// //                 <Link to="/login" aria-label="Account">
// //                   <User size={22} strokeWidth={1.8} className="nav-icon" />
// //                   <span>Account</span>
// //                 </Link>

// //               </li>

// //               <li>
// //                 <a href="#" aria-label="Notification">
// //                   <Bell size={22} strokeWidth={1.8} className="nav-icon" />
// //                   <span>Notification</span>
// //                 </a>
// //               </li>

// //               <li>
// //                 <Link to="#" aria-label="Wishlist">
// //                   <Heart size={22} strokeWidth={1.8} className="nav-icon" />
// //                   <span>Wishlist</span>
// //                 </Link>
// //               </li>

// //               <li>
// //                 <Link to="/cart" aria-label="Cart">
// //                   <ShoppingCart
// //                     size={22}
// //                     strokeWidth={1.8}
// //                     className="nav-icon"
// //                   />
// //                   <span>Add to Cart</span>
// //                 </Link>
// //               </li>
// //             </ul>
// //           </nav>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Nav2;


// import React from "react";
// import "../Styles/Nav2.css";
// import logo from "../assets/Home/logo.png";
// import { Search, User, Bell, Heart, ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";

// const Nav2 = () => {
//   // Example: check if user is logged in
//   const isLoggedIn = !!localStorage.getItem("token"); // Replace "token" with your auth key

//   return (
//     <header className="searchbar">
//       <div className="container">
//         <div className="content">

//           <div className="logo">
//             <Link to="/">
//               <img src={logo} alt="Grabit logo" loading="lazy" />
//             </Link>
//           </div>

//           <form
//             className="search"
//             role="search"
//             onSubmit={(e) => e.preventDefault()}
//             aria-label="Site search"
//           >
//             <input
//               type="text"
//               placeholder="Search products, brands, vendors....."
//               aria-label="Search products"
//             />
//             <button
//               className="search-btn"
//               type="submit"
//               aria-label="Submit search"
//               title="Search"
//             >
//               <Search size={18} strokeWidth={2} className="nav-icon" />
//             </button>
//           </form>

//           <nav className="myaccount" aria-label="User menu">
//             <ul className="nav-links">
//               <li>
//                 {isLoggedIn ? (
//                   <Link to="/" aria-label="Account">
//                     <User size={22} strokeWidth={1.8} className="nav-icon" />
//                     <span>Account</span>
//                   </Link>
//                 ) : (
//                   <Link to="/login" aria-label="Account">
//                     <User size={22} strokeWidth={1.8} className="nav-icon" />
//                     <span>Account</span>
//                   </Link>
//                 )}
//               </li>

//               <li>
//                 <a href="#" aria-label="Notification">
//                   <Bell size={22} strokeWidth={1.8} className="nav-icon" />
//                   <span>Notification</span>
//                 </a>
//               </li>

//               <li>
//                 <Link to="#" aria-label="Wishlist">
//                   <Heart size={22} strokeWidth={1.8} className="nav-icon" />
//                   <span>Wishlist</span>
//                 </Link>
//               </li>

//               <li>
//                 <Link to="/cart" aria-label="Cart">
//                   <ShoppingCart size={22} strokeWidth={1.8} className="nav-icon" />
//                   <span>Add to Cart</span>
//                 </Link>
//               </li>
//             </ul>
//           </nav>

//         </div>
//       </div>
//     </header>
//   );
// };

// export default Nav2;


// import React, { useState } from "react";
// import "../Styles/Nav2.css";
// import logo from "../assets/Home/logo.png";
// import { Search, User, Bell, Heart, ShoppingCart, LogOut } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// const Nav2 = () => {
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Example: check if user is logged in
//   const token = localStorage.getItem("token"); // Replace "token" with your auth key
//   const isLoggedIn = !!token;

//   // Example username, you can replace this with real user info from localStorage or context
//   const username = localStorage.getItem("username") || "User";

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     setDropdownOpen(false);
//     navigate("/login"); // redirect to login
//   };

//   return (
//     <header className="searchbar">
//       <div className="container">
//         <div className="content">

//           <div className="logo">
//             <Link to="/">
//               <img src={logo} alt="Grabit logo" loading="lazy" />
//             </Link>
//           </div>

//           <form
//             className="search"
//             role="search"
//             onSubmit={(e) => e.preventDefault()}
//             aria-label="Site search"
//           >
//             <input
//               type="text"
//               placeholder="Search products, brands, vendors....."
//               aria-label="Search products"
//             />
//             <button
//               className="search-btn"
//               type="submit"
//               aria-label="Submit search"
//               title="Search"
//             >
//               <Search size={18} strokeWidth={2} className="nav-icon" />
//             </button>
//           </form>

//           <nav className="myaccount" aria-label="User menu">
//             <ul className="nav-links">

//               {/* User Icon with Dropdown */}
//               <li className="user-menu">
//                 <div
//                   className="user-icon"
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <User size={22} strokeWidth={1.8} className="nav-icon" />
//                   <span>Account</span>
//                 </div>

//                 {isLoggedIn && dropdownOpen && (
//                   <div className="user-dropdown">
//                     <p className="username">Hello, {username}</p>
//                     <button onClick={handleLogout} className="logout-btn">
//                       <LogOut size={16} /> Logout
//                     </button>
//                   </div>
//                 )}
//               </li>

//               <li>
//                 <a href="#" aria-label="Notification">
//                   <Bell size={22} strokeWidth={1.8} className="nav-icon" />
//                   <span>Notification</span>
//                 </a>
//               </li>

//               <li>
//                 <Link to="#" aria-label="Wishlist">
//                   <Heart size={22} strokeWidth={1.8} className="nav-icon" />
//                   <span>Wishlist</span>
//                 </Link>
//               </li>

//               <li>
//                 <Link to="/cart" aria-label="Cart">
//                   <ShoppingCart size={22} strokeWidth={1.8} className="nav-icon" />
//                   <span>Add to Cart</span>
//                 </Link>
//               </li>
//             </ul>
//           </nav>

//         </div>
//       </div>
//     </header>
//   );
// };

// export default Nav2;


import React, { useState } from "react";
import "../Styles/Nav2.css";
import logo from "../assets/Home/logo.png";
import { Search, User, Bell, Heart, ShoppingCart, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

const Nav2 = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const username = localStorage.getItem("username") || "User";
  const { notificationCount } = useNotification();

  const handleUserClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="searchbar">
      <div className="container">
        <div className="content">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Grabit logo" loading="lazy" />
            </Link>
          </div>

          {/* Search */}
          <form
            className="search"
            role="search"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Site search"
          >
            <input
              type="text"
              placeholder="Search products, brands, vendors..."
              aria-label="Search products"
            />
            <button className="search-btn" type="submit" aria-label="Submit search">
              <Search size={18} strokeWidth={2} className="nav-icon" />
            </button>
          </form>

          {/* Right-side menu */}
          <nav className="myaccount" aria-label="User menu">
            <ul className="nav-links">
              {/* User Dropdown */}
              <li className="user-menu">
                <div
                  className="user-icon"
                  onClick={handleUserClick}
                  style={{ cursor: "pointer" }}
                >
                  <User size={22} strokeWidth={1.8} className="nav-icon" />
                  <span>Account</span>
                </div>

                {isLoggedIn && dropdownOpen && (
                  <div className="user-dropdown">
                    <p className="username">Hello, {username}</p>
                    <button onClick={handleLogout} className="logout-btn">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </li>

              {/* Notifications */}
              <li className="relative">
                <a href="#" aria-label="Notification">
                  <Bell size={22} strokeWidth={1.8} className="nav-icon" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                  <span>Notification</span>
                </a>
              </li>

              {/* Wishlist */}
              <li>
                <Link to="#" aria-label="Wishlist">
                  <Heart size={22} strokeWidth={1.8} className="nav-icon" />
                  <span>Wishlist</span>
                </Link>
              </li>

              {/* Cart */}
              <li>
                <Link to="/cart" aria-label="Cart">
                  <ShoppingCart size={22} strokeWidth={1.8} className="nav-icon" />
                  <span>Add to Cart</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Nav2;
