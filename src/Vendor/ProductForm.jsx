// "use client";

// import { useState, useEffect } from "react";
// import axiosInstance from "../lib/axiosInstance";

// export default function ProductForm({ product, onSuccess, onCancel }) {
//   // Initialize state
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState(""); // keep empty for placeholder
//   const [stock, setStock] = useState(""); // keep empty for placeholder
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/categories");
//         setCategories(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Sync state when `product` changes (edit mode)
//   useEffect(() => {
//     if (product) {
//       setName(product.name || "");
//       setDescription(product.description || "");
//       setPrice(
//         product.price !== undefined && product.price !== null && product.price !== 0
//           ? product.price.toString()
//           : ""
//       );
//       setStock(
//         product.stock !== undefined && product.stock !== null && product.stock !== 0
//           ? product.stock.toString()
//           : ""
//       );
//       setCategory(product.category || "");
//       setImage(null);
//     } else {
//       setName("");
//       setDescription("");
//       setPrice("");
//       setStock("");
//       setCategory("");
//       setImage(null);
//     }
//   }, [product]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Not authenticated");

//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price ? price.toString() : "0");
//       formData.append("stock", stock ? stock.toString() : "0");
//       formData.append("category", category);
//       if (image) formData.append("image", image);

//       let res;
//       if (product?._id) {
//         res = await axiosInstance.put(`/vendors/product/${product._id}`, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         alert("✅ Product updated successfully!");
//       } else {
//         res = await axiosInstance.post("/products", formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         alert("✅ Product created successfully!");
//       }

//       if (onSuccess) onSuccess(res.data);

//       if (!product) {
//         setName("");
//         setDescription("");
//         setPrice("");
//         setStock("");
//         setCategory("");
//         setImage(null);
//       }
//     } catch (err) {
//       alert(`❌ Failed: ${err.response?.data?.message || err.message}`);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg space-y-4"
//     >
//       <h2 className="text-2xl font-bold mb-4">
//         {product ? "Edit Product" : "Add New Product"}
//       </h2>

//       <input
//         type="text"
//         placeholder="Product Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full border rounded px-3 py-2"
//         required
//       />

//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="w-full border rounded px-3 py-2"
//       />

//       <input
//         type="number"
//         placeholder="Price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         className="w-full border rounded px-3 py-2"
//       />

//       <input
//         type="number"
//         placeholder="Stock"
//         value={stock}
//         onChange={(e) => setStock(e.target.value)}
//         className="w-full border rounded px-3 py-2"
//       />

//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         className="w-full border rounded px-3 py-2"
//         required
//       >
//         <option value="">Select Category</option>
//         {categories.map((cat) => (
//           <option key={cat._id} value={cat._id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
//         className="w-full border rounded px-3 py-2"
//       />

//       <div className="flex gap-2">
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading
//             ? product
//               ? "Updating..."
//               : "Uploading..."
//             : product
//             ? "Update Product"
//             : "Create Product"}
//         </button>

//         {product && onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }


// components/ProductForm.jsx
"use client";

import { useState, useEffect } from "react";
import axiosInstance from "../lib/axiosInstance";

export default function ProductForm({ product, onSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // 🔹 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Fill fields in edit mode
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(
        product.price && product.price !== 0 ? product.price.toString() : ""
      );
      setStock(
        product.stock && product.stock !== 0 ? product.stock.toString() : ""
      );
      setCategory(product.category || "");
      setImage(null);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImage(null);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price ? price.toString() : "0");
      formData.append("stock", stock ? stock.toString() : "0");
      formData.append("category", category);
      if (image) formData.append("image", image);

      let res;
      if (product?._id) {
        res = await axiosInstance.put(`/vendors/product/${product._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("✅ Product updated successfully!");
      } else {
        res = await axiosInstance.post("/products", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("✅ Product created successfully!");
      }

      if (onSuccess) onSuccess(res.data);

      if (!product) {
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setCategory("");
        setImage(null);
      }
    } catch (err) {
      alert(`❌ Failed: ${err.response?.data?.message || err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      {/* 🏷️ Product Name */}
      <div>
        <label className="block font-semibold mb-1">Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {/* 🏷️ Description */}
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          placeholder="Write product details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* 🏷️ Price */}
      <div>
        <label className="block font-semibold mb-1">Price (₹)</label>
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* 🏷️ Stock */}
      <div>
        <label className="block font-semibold mb-1">Stock</label>
        <input
          type="number"
          placeholder="Enter available quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* 🏷️ Category */}
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🏷️ Image */}
      <div>
        <label className="block font-semibold mb-1">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* 🏷️ Buttons */}
      <div className="flex gap-3 justify-center mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading
            ? product
              ? "Updating..."
              : "Saving..."
            : product
            ? "Update Product"
            : "Create Product"}
        </button>

        {product && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
