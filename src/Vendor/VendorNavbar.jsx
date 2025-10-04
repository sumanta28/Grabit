import { Link } from "react-router-dom";
import VendorLogout from "./VendorLogout";

export default function VendorNavbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6">
      <Link to="/Vendor/VendorDashboardPage" className="hover:text-blue-400">Dashboard</Link>
      <Link to="/Vendor/VendorProductsPage" className="hover:text-blue-400">Products</Link>
      <Link to="/Vendor/Orders" className="hover:text-blue-400">Orders</Link>
      <Link to="/Vendor/Profile" className="hover:text-blue-400">Profile</Link>
      <Link to="/vendor/CategoryForm" className="hover:text-blue-400">Create Categories</Link>
       <div className="ml-auto">
        <VendorLogout />
      </div>
    </nav>
  );
}