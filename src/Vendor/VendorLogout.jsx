import React from "react";
import { useNavigate } from "react-router-dom";

export default function VendorLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove vendor token and role only
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
