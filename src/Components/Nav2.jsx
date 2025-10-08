// import React, { useState } from "react";
// import "../Styles/Nav2.css";
// import logo from "../assets/Home/logo.png";
// import { Search, User, Bell, Heart, ShoppingCart, LogOut } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import NotificationBell from "./NotificationBell";
// import SearchBar from "./SearchBar"

// const Nav2 = () => {
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const token = localStorage.getItem("token");
//   const isLoggedIn = !!token;
//   const username = localStorage.getItem("username") || "User";

//   const handleUserClick = () => {
//     if (!isLoggedIn) {
//       navigate("/login");
//     } else {
//       setDropdownOpen(!dropdownOpen);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     setDropdownOpen(false);
//     navigate("/login");
//   };


//   return (
//     <header className="searchbar">
//       <div className="container">
//         <div className="content">
//           {/* Logo */}
//           <div className="logo">
//             <Link to="/">
//               <img src={logo} alt="Grabit logo" loading="lazy" />
//             </Link>
//           </div>

//           {/* Search */}
//           <SearchBar />

//           {/* Right-side menu */}
//           <nav className="myaccount" aria-label="User menu">
//             <ul className="nav-links">

//               {/* User Dropdown */}
//               <li className="user-menu">
//                 <div
//                   className="user-icon"
//                   onClick={handleUserClick}
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

//               {/* Notifications */}
//               <li className="flex flex-col items-center">
//                 <div className="w-6 h-6 mb-1 flex justify-center items-center">
//                   <NotificationBell />
//                 </div>
//                 <span className="text-sm">Notification</span>
//               </li>

//               {/* Wishlist */}
//               <li>
//                 <Link to="#" aria-label="Wishlist">
//                   <Heart size={22} strokeWidth={1.8} className="nav-icon" />
//                   <span>Wishlist</span>
//                 </Link>
//               </li>

//               {/* Cart */}
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
import NotificationBell from "./NotificationBell";
import SearchBar from "./SearchBar";

const Nav2 = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const username = localStorage.getItem("username") || "User";

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

  const goToOrders = () => {
    setDropdownOpen(false);
    navigate("/orders"); // Replace with your orders page route
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
          <SearchBar />

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

                    <button onClick={goToOrders} className="dropdown-btn">
                      Orders
                    </button>

                    <button onClick={handleLogout} className="logout-btn">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </li>

              {/* Notifications */}
              <li className="flex flex-col items-center">
                <div className="w-6 h-6 mb-1 flex justify-center items-center">
                  <NotificationBell />
                </div>
                <span className="text-sm">Notification</span>
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
