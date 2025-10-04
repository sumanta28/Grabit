import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";

export default function VendorCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      alert("❌ Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // Delete a category
  const handleDelete = async (category) => {
    if (!window.confirm(`Are you sure you want to delete "${category.name}"?`)) return;

    try {
      const token = localStorage.getItem("token");

      // Detect correct ID field (_id or id)
      const categoryId = category._id || category.id;
      if (!categoryId) throw new Error("Invalid category ID");

      // Adjust endpoint if your API expects something else
      await axiosInstance.delete(`/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert(`❌ Failed to delete category: ${err.response?.data?.message || err.message}`);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading categories...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">All Categories</h2>

      {categories.length === 0 ? (
        <p className="text-gray-600">No categories available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div
              key={category._id || category.id}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
                {category.description && <p className="text-gray-500">{category.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(category)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
