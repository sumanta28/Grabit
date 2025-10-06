import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import VendorDashboardPage from "../Vendor/VendorDashboardPage.jsx";
import ProductForm from "../Vendor/ProductForm.jsx";
import VendorProductsPage from "../Vendor/VendorProductsPage.jsx";
import Profile from "../Vendor/Profile.jsx";
import Orders from "../Vendor/Orders.jsx";
import CategoryForm from "../Vendor/CategoryForm.jsx";
import CategoryPage from "../Pages/CategoryPage";
import VendorCategoriesPage from "../Vendor/VendorCategoriesPage";
import ProductDetailPage from "../Pages/ProductDetailPage.jsx";
import CartPage from  "../Pages/CartPage.jsx"

function Routing() {
  return (
    <Routes>
      {/* Normal user pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Cart */}
      <Route path="/cart" element={<CartPage/>}></Route>

      {/* Vendor only pages */}
      <Route path="/vendor/vendordashboardpage" element={<VendorDashboardPage />} />
      <Route path="/vendor/vendorproductspage" element={<VendorProductsPage />} />
      <Route path="/vendor/profile" element={<Profile />} />
      <Route path="/vendor/productform" element={<ProductForm />} />
      <Route path="/vendor/orders" element={<Orders />} />
      <Route path="/vendor/categoryform" element={<CategoryForm />} />
      <Route path="/vendor/VendorCategoriesPage" element={<VendorCategoriesPage />}></Route>

      {/* Category pages */}
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/category/:category/:subcategory" element={<CategoryPage />} />

      {/* Product Detail Page */}
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default Routing;
