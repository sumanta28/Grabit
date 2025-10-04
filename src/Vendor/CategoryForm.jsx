// components/CategoryForm.jsx
"use client";

import { useState } from "react";
import axiosInstance from "../lib/axiosInstance";

export default function CategoryForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to generate slug from category name
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
      .replace(/\s+/g, "-");        // replace spaces with hyphen
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const slug = generateSlug(name);

      const res = await axiosInstance.post(
        "/categories",
        { name, slug }, // ✅ only name + slug
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Category created successfully!");
      console.log(res.data);

      // Reset form
      setName("");

      // Notify parent
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      alert(
        `❌ Failed to create category: ${
          err.response?.data?.message || err.message
        }`
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow p-6 rounded-lg space-y-4"
    >
      <h2 className="text-xl font-bold mb-2">Add New Category</h2>

      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Saving..." : "Create Category"}
      </button>
    </form>
  );
}
