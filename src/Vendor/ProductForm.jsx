// // // components/ProductForm.jsx
// // "use client";

// // import { useState, useEffect } from "react";
// // import axiosInstance from "../lib/axiosInstance";

// // export default function ProductForm({ onSuccess }) {
// //   const [name, setName] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [price, setPrice] = useState(0);
// //   const [stock, setStock] = useState(0);
// //   const [category, setCategory] = useState("");
// //   const [image, setImage] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [categories, setCategories] = useState([]);

// //   // Fetch categories on mount
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await axiosInstance.get("/categories");
// //         setCategories(res.data || []);
// //       } catch (err) {
// //         console.error("Failed to fetch categories:", err);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) throw new Error("Not authenticated");

// //       const formData = new FormData();
// //       formData.append("name", name);
// //       formData.append("description", description);
// //       formData.append("price", price.toString());
// //       formData.append("stock", stock.toString());
// //       formData.append("category", category);
// //       if (image) formData.append("image", image);

// //       const res = await axiosInstance.post("/products", formData, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "multipart/form-data",
// //         },
// //       });

// //       alert("✅ Product created successfully!");
// //       console.log(res.data);

// //       // Reset form
// //       setName("");
// //       setDescription("");
// //       setPrice(0);
// //       setStock(0);
// //       setCategory("");
// //       setImage(null);

// //       // Callback to parent if needed
// //       if (onSuccess) onSuccess(res.data);
// //     } catch (err) {
// //       alert(
// //         `❌ Failed to create product: ${
// //           err.response?.data?.message || err.message
// //         }`
// //       );
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg space-y-4"
// //     >
// //       <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

// //       <input
// //         type="text"
// //         placeholder="Product Name"
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <textarea
// //         placeholder="Description"
// //         value={description}
// //         onChange={(e) => setDescription(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //       />

// //       <input
// //         type="number"
// //         placeholder="Price"
// //         value={price}
// //         onChange={(e) => setPrice(parseInt(e.target.value))}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <input
// //         type="number"
// //         placeholder="Stock"
// //         value={stock}
// //         onChange={(e) => setStock(parseInt(e.target.value))}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       {/* Dropdown for categories */}
// //       <select
// //         value={category}
// //         onChange={(e) => setCategory(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       >
// //         <option value="">Select Category</option>
// //         {categories.map((cat) => (
// //           <option key={cat._id} value={cat._id}>
// //             {cat.name}
// //           </option>
// //         ))}
// //       </select>

// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
// //         className="w-full border rounded px-3 py-2"
// //       />

// //       <button
// //         type="submit"
// //         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// //         disabled={loading}
// //       >
// //         {loading ? "Uploading..." : "Create Product"}
// //       </button>
// //     </form>
// //   );
// // }


// // "use client";

// // import { useState, useEffect } from "react";
// // import axiosInstance from "../lib/axiosInstance";

// // export default function ProductForm({ product, onSuccess, onCancel }) {
// //   const [name, setName] = useState(product ? product.name : "");
// //   const [description, setDescription] = useState(product ? product.description : "");
// //   const [price, setPrice] = useState(product ? product.price : 0);
// //   const [stock, setStock] = useState(product ? product.stock : 0);
// //   const [category, setCategory] = useState(product ? product.category : "");
// //   const [image, setImage] = useState(null); // optional new image
// //   const [loading, setLoading] = useState(false);
// //   const [categories, setCategories] = useState([]);

// //   // Fetch categories
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await axiosInstance.get("/categories");
// //         setCategories(res.data || []);
// //       } catch (err) {
// //         console.error("Failed to fetch categories:", err);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) throw new Error("Not authenticated");

// //       const formData = new FormData();
// //       formData.append("name", name);
// //       formData.append("description", description);
// //       formData.append("price", price.toString());
// //       formData.append("stock", stock.toString());
// //       formData.append("category", category);
// //       if (image) formData.append("image", image);

// //       let res;

// //       if (product?._id) {
// //         // EDIT mode
// //         res = await axiosInstance.put(`/vendors/product/${product._id}`, formData, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });
// //         alert("✅ Product updated successfully!");
// //       } else {
// //         // CREATE mode
// //         res = await axiosInstance.post("/products", formData, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });
// //         alert("✅ Product created successfully!");
// //       }

// //       if (onSuccess) onSuccess(res.data);

// //       // Reset form only if creating new product
// //       if (!product) {
// //         setName("");
// //         setDescription("");
// //         setPrice(0);
// //         setStock(0);
// //         setCategory("");
// //         setImage(null);
// //       }
// //     } catch (err) {
// //       alert(
// //         `❌ Failed: ${err.response?.data?.message || err.message}`
// //       );
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg space-y-4"
// //     >
// //       <h2 className="text-2xl font-bold mb-4">
// //         {product ? "Edit Product" : "Add New Product"}
// //       </h2>

// //       <input
// //         type="text"
// //         placeholder="Product Name"
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <textarea
// //         placeholder="Description"
// //         value={description}
// //         onChange={(e) => setDescription(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //       />

// //       <input
// //         type="number"
// //         placeholder="Price"
// //         value={price}
// //         onChange={(e) => setPrice(parseInt(e.target.value))}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <input
// //         type="number"
// //         placeholder="Stock"
// //         value={stock}
// //         onChange={(e) => setStock(parseInt(e.target.value))}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <select
// //         value={category}
// //         onChange={(e) => setCategory(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       >
// //         <option value="">Select Category</option>
// //         {categories.map((cat) => (
// //           <option key={cat._id} value={cat._id}>
// //             {cat.name}
// //           </option>
// //         ))}
// //       </select>

// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
// //         className="w-full border rounded px-3 py-2"
// //       />

// //       <div className="flex gap-2">
// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// //           disabled={loading}
// //         >
// //           {loading
// //             ? product
// //               ? "Updating..."
// //               : "Uploading..."
// //             : product
// //             ? "Update Product"
// //             : "Create Product"}
// //         </button>
// //         {product && onCancel && (
// //           <button
// //             type="button"
// //             onClick={onCancel}
// //             className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
// //           >
// //             Cancel
// //           </button>
// //         )}
// //       </div>
// //     </form>
// //   );
// // }


// // "use client";

// // import { useState, useEffect } from "react";
// // import axiosInstance from "../lib/axiosInstance";

// // export default function ProductForm({ product, onSuccess, onCancel }) {
// //   // Initialize state
// //   const [name, setName] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [price, setPrice] = useState(0);
// //   const [stock, setStock] = useState(0);
// //   const [category, setCategory] = useState("");
// //   const [image, setImage] = useState(null); // optional new image
// //   const [loading, setLoading] = useState(false);
// //   const [categories, setCategories] = useState([]);

// //   // Fetch categories
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await axiosInstance.get("/categories");
// //         setCategories(res.data || []);
// //       } catch (err) {
// //         console.error("Failed to fetch categories:", err);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Sync state when `product` prop changes (for edit)
// //   useEffect(() => {
// //     if (product) {
// //       setName(product.name || "");
// //       setDescription(product.description || "");
// //       setPrice(product.price || 0);
// //       setStock(product.stock || 0);
// //       setCategory(product.category || "");
// //       setImage(null); // reset image for optional new upload
// //     } else {
// //       // Reset form for creating new product
// //       setName("");
// //       setDescription("");
// //       setPrice(0);
// //       setStock(0);
// //       setCategory("");
// //       setImage(null);
// //     }
// //   }, [product]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) throw new Error("Not authenticated");

// //       const formData = new FormData();
// //       formData.append("name", name);
// //       formData.append("description", description);
// //       formData.append("price", price.toString());
// //       formData.append("stock", stock.toString());
// //       formData.append("category", category);
// //       if (image) formData.append("image", image);

// //       let res;

// //       if (product?._id) {
// //         // EDIT mode
// //         res = await axiosInstance.put(`/vendors/product/${product._id}`, formData, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });
// //         alert("✅ Product updated successfully!");
// //       } else {
// //         // CREATE mode
// //         res = await axiosInstance.post("/products", formData, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });
// //         alert("✅ Product created successfully!");
// //       }

// //       if (onSuccess) onSuccess(res.data);

// //       // Reset form only if creating new product
// //       if (!product) {
// //         setName("");
// //         setDescription("");
// //         setPrice(0);
// //         setStock(0);
// //         setCategory("");
// //         setImage(null);
// //       }
// //     } catch (err) {
// //       alert(
// //         `❌ Failed: ${err.response?.data?.message || err.message}`
// //       );
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg space-y-4"
// //     >
// //       <h2 className="text-2xl font-bold mb-4">
// //         {product ? "Edit Product" : "Add New Product"}
// //       </h2>

// //       <input
// //         type="text"
// //         placeholder="Product Name"
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <textarea
// //         placeholder="Description"
// //         value={description}
// //         onChange={(e) => setDescription(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //       />

// //       <input
// //         type="number"
// //         placeholder="Price"
// //         value={price}
// //         onChange={(e) => setPrice(parseInt(e.target.value))}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <input
// //         type="number"
// //         placeholder="Stock"
// //         value={stock}
// //         onChange={(e) => setStock(parseInt(e.target.value))}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <select
// //         value={category}
// //         onChange={(e) => setCategory(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       >
// //         <option value="">Select Category</option>
// //         {categories.map((cat) => (
// //           <option key={cat._id} value={cat._id}>
// //             {cat.name}
// //           </option>
// //         ))}
// //       </select>

// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
// //         className="w-full border rounded px-3 py-2"
// //       />

// //       <div className="flex gap-2">
// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// //           disabled={loading}
// //         >
// //           {loading
// //             ? product
// //               ? "Updating..."
// //               : "Uploading..."
// //             : product
// //             ? "Update Product"
// //             : "Create Product"}
// //         </button>

// //         {product && onCancel && (
// //           <button
// //             type="button"
// //             onClick={onCancel}
// //             className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
// //           >
// //             Cancel
// //           </button>
// //         )}
// //       </div>
// //     </form>
// //   );
// // }


// // components/ProductForm.jsx
// // "use client";

// // import { useState, useEffect } from "react";
// // import axiosInstance from "../lib/axiosInstance";

// // export default function ProductForm({ product, onSuccess, onCancel }) {
// //   // Initialize state
// //   const [name, setName] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [price, setPrice] = useState(""); // start empty
// //   const [stock, setStock] = useState(""); // start empty
// //   const [category, setCategory] = useState("");
// //   const [image, setImage] = useState(null); // optional new image
// //   const [loading, setLoading] = useState(false);
// //   const [categories, setCategories] = useState([]);

// //   // Fetch categories
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await axiosInstance.get("/categories");
// //         setCategories(res.data || []);
// //       } catch (err) {
// //         console.error("Failed to fetch categories:", err);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Sync state when `product` prop changes (for edit)
// //   useEffect(() => {
// //     if (product) {
// //       setName(product.name || "");
// //       setDescription(product.description || "");
// //       setPrice(product.price !== undefined ? product.price.toString() : "");
// //       setStock(product.stock !== undefined ? product.stock.toString() : "");
// //       setCategory(product.category || "");
// //       setImage(null); // reset image for optional new upload
// //     } else {
// //       // Reset form for creating new product
// //       setName("");
// //       setDescription("");
// //       setPrice("");
// //       setStock("");
// //       setCategory("");
// //       setImage(null);
// //     }
// //   }, [product]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) throw new Error("Not authenticated");

// //       const formData = new FormData();
// //       formData.append("name", name);
// //       formData.append("description", description);
// //       formData.append("price", price ? price.toString() : "0");
// //       formData.append("stock", stock ? stock.toString() : "0");
// //       formData.append("category", category);
// //       if (image) formData.append("image", image);

// //       let res;

// //       if (product?._id) {
// //         // EDIT mode
// //         res = await axiosInstance.put(`/vendors/product/${product._id}`, formData, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });
// //         alert("✅ Product updated successfully!");
// //       } else {
// //         // CREATE mode
// //         res = await axiosInstance.post("/products", formData, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });
// //         alert("✅ Product created successfully!");
// //       }

// //       if (onSuccess) onSuccess(res.data);

// //       // Reset form only if creating new product
// //       if (!product) {
// //         setName("");
// //         setDescription("");
// //         setPrice("");
// //         setStock("");
// //         setCategory("");
// //         setImage(null);
// //       }
// //     } catch (err) {
// //       alert(`❌ Failed: ${err.response?.data?.message || err.message}`);
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg space-y-4"
// //     >
// //       <h2 className="text-2xl font-bold mb-4">
// //         {product ? "Edit Product" : "Add New Product"}
// //       </h2>

// //       <input
// //         type="text"
// //         placeholder="Product Name"
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <textarea
// //         placeholder="Description"
// //         value={description}
// //         onChange={(e) => setDescription(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //       />

// //       <input
// //         type="number"
// //         placeholder="Price"
// //         value={price}
// //         onChange={(e) => setPrice(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <input
// //         type="number"
// //         placeholder="Stock"
// //         value={stock}
// //         onChange={(e) => setStock(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       />

// //       <select
// //         value={category}
// //         onChange={(e) => setCategory(e.target.value)}
// //         className="w-full border rounded px-3 py-2"
// //         required
// //       >
// //         <option value="">Select Category</option>
// //         {categories.map((cat) => (
// //           <option key={cat._id} value={cat._id}>
// //             {cat.name}
// //           </option>
// //         ))}
// //       </select>

// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
// //         className="w-full border rounded px-3 py-2"
// //       />

// //       <div className="flex gap-2">
// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// //           disabled={loading}
// //         >
// //           {loading
// //             ? product
// //               ? "Updating..."
// //               : "Uploading..."
// //             : product
// //             ? "Update Product"
// //             : "Create Product"}
// //         </button>

// //         {product && onCancel && (
// //           <button
// //             type="button"
// //             onClick={onCancel}
// //             className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
// //           >
// //             Cancel
// //           </button>
// //         )}
// //       </div>
// //     </form>
// //   );
// // }


// // components/ProductForm.jsx
// "use client";

// import { useState, useEffect } from "react";
// import axiosInstance from "../lib/axiosInstance";

// export default function ProductForm({ product, onSuccess, onCancel }) {
//   // Initialize state
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState(""); // start empty
//   const [stock, setStock] = useState(""); // start empty
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null); // optional new image
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

 
//   useEffect(() => {
//   if (product) {
//     setName(product.name || "");
//     setDescription(product.description || "");
//     setPrice(
//   product.price !== undefined && product.price !== null
//     ? product.price.toString()
//     : ""
// );
// setStock(
//   product.stock !== undefined && product.stock !== null
//     ? product.stock.toString()
//     : ""
// );

//     setCategory(product.category || "");
//     setImage(null); // reset image for optional new upload
//   } else {
//     setName("");
//     setDescription("");
//     setPrice("");
//     setStock("");
//     setCategory("");
//     setImage(null);
//   }
// }, [product]);


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
//         // EDIT mode
//         res = await axiosInstance.put(`/vendors/product/${product._id}`, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         alert("✅ Product updated successfully!");
//       } else {
//         // CREATE mode
//         res = await axiosInstance.post("/products", formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         alert("✅ Product created successfully!");
//       }

//       if (onSuccess) onSuccess(res.data);

//       // Reset form only if creating new product
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
//         required
//       />

//       <input
//         type="number"
//         placeholder="Stock"
//         value={stock}
//         onChange={(e) => setStock(e.target.value)}
//         className="w-full border rounded px-3 py-2"
//         required
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
  // Initialize state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // keep empty for placeholder
  const [stock, setStock] = useState(""); // keep empty for placeholder
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories
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

  // Sync state when `product` changes (edit mode)
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(
        product.price !== undefined && product.price !== null && product.price !== 0
          ? product.price.toString()
          : ""
      );
      setStock(
        product.stock !== undefined && product.stock !== null && product.stock !== 0
          ? product.stock.toString()
          : ""
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
      <h2 className="text-2xl font-bold mb-4">
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        className="w-full border rounded px-3 py-2"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading
            ? product
              ? "Updating..."
              : "Uploading..."
            : product
            ? "Update Product"
            : "Create Product"}
        </button>

        {product && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
