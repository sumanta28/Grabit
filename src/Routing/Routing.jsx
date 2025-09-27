import { Routes, Route, Link } from "react-router-dom";
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import VendorDashboardPage from "../Vendor/VendorDashboardPage.jsx";
import ProductForm from "../Vendor/ProductForm.jsx";
import VendorProductsPage from "../Vendor/VendorProductsPage.jsx";
import Profile from "../Vendor/Profile.jsx";
import Orders from "../Vendor/Orders.jsx";


function Routing() {
  return (
    <>
     <Routes>
  {/* Normal user pages */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* Vendor only pages */}
  <Route path="/Vendor/VendorDashboardPage" element={<VendorDashboardPage />} />
  <Route path="/Vendor/VendorProductsPage" element={<VendorProductsPage />} />
  <Route path="/Vendor/Profile" element={<Profile />} />
  <Route path="/Vendor/ProductForm" element={<ProductForm />} />
  <Route path="/Vendor/Orders" element={<Orders />} />
</Routes>

    </>
  );
}

export default Routing;
