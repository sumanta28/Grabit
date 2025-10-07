// import React, { useEffect, useState } from "react";
// import ProductForm from "./ProductForm"; // keep this if you already have it
// import axiosInstance from "../lib/axiosInstance"; // adjusted path


// export default function VendorProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axiosInstance.get("/vendors/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Failed to fetch products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this product?")) return;

//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("Not authenticated");

//     // ✅ Correct API route for vendor delete
//     await axiosInstance.delete(`/vendors/product/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     alert("✅ Product deleted successfully!");
//     fetchProducts(); // refresh the list
//   } catch (err) {
//     alert(`❌ Failed to delete: ${err.response?.data?.message || err.message}`);
//     console.error("Failed to delete product:", err);
//   }
// };


//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleUpdate = async (updatedProduct, id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axiosInstance.put(`/vendors/product/${id}`, updatedProduct, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("✅ Product updated");
//       setEditingProduct(null);
//       fetchProducts();
//     } catch (err) {
//       console.error("Failed to update product:", err);
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading products...</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Create or Edit Product Form */}
//      {editingProduct ? (
//   <ProductForm
//     product={editingProduct}
//     onSuccess={() => {
//       setEditingProduct(null);
//       fetchProducts();
//     }}
//     onCancel={() => setEditingProduct(null)}
//   />
// ) : (
//   <ProductForm onSuccess={fetchProducts} />
// )}


//       <h2 className="text-2xl font-bold mt-8 mb-4">Your Products</h2>

//       {products.length === 0 ? (
//         <p className="text-gray-600">You have no products yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white shadow rounded-lg p-4 flex flex-col"
//             >
//               {/* <img
//                 src={product.image ? getImg(product.image) : "/placeholder.png"}
//                 alt={product.name}
//                 className="h-48 w-full object-cover rounded mb-4"
//               /> */}

//               <h3 className="font-semibold text-lg">{product.name}</h3>
//               <p className="text-gray-500">₹{product.price}</p>
//               <p className="text-gray-500">Stock: {product.stock}</p>
//               <p
//                 className={`mt-2 font-semibold ${
//                   product.status === "approved"
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {product.status.toUpperCase()}
//               </p>

//               <div className="mt-auto flex gap-2">
//                 <button
//                   onClick={() => handleEdit(product)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(product._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm"; // keep this if you already have it
import axiosInstance from "../lib/axiosInstance"; // adjusted path
import { getImg } from "../lib/utils"; // ✅ import your getImg() helper

export default function VendorProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/vendors/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
       console.log(res.data)
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      await axiosInstance.delete(`/vendors/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      alert(`❌ Failed to delete: ${err.response?.data?.message || err.message}`);
      console.error("Failed to delete product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (updatedProduct, id) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(`/vendors/product/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Product updated");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Create or Edit Product Form */}
      {editingProduct ? (
        <ProductForm
          product={editingProduct}
          onSuccess={() => {
            setEditingProduct(null);
            fetchProducts();
          }}
          onCancel={() => setEditingProduct(null)}
        />
      ) : (
        <ProductForm onSuccess={fetchProducts} />
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Your Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-600">You have no products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col"
            >
              {/* ✅ Product Image Display */}
              <img
                src={
                  product.image
                    ? getImg(product.image)
                    : "/placeholder.png"
                }
                alt={product.name}
                className="h-90 w-full object-cover rounded mb-4 border"
              />

              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-500">₹{product.price}</p>
              <p className="text-gray-500">Stock: {product.stock}</p>
              {product.description && (
                <p className="text-gray-700 mt-1">{product.description}</p>
              )}
            <p>Category: {typeof product.category === "object" ? product.category.name : product.category.name}</p>

              <p
                className={`mt-2 font-semibold ${product.status === "approved"
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {product.status.toUpperCase()}
              </p>

              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
