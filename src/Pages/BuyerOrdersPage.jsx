// import React, { useEffect, useState } from "react";
// import axiosInstance from "../lib/axiosInstance";
// import { getImg } from "../lib/utils";
// import { useNavigate } from "react-router-dom";

// export default function BuyerOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await axiosInstance.get("/orders/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data || []);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return <div className="text-center py-10 text-gray-600">Loading your orders...</div>;

//   if (orders.length === 0)
//     return <div className="text-center py-10 text-gray-600">You have no orders yet.</div>;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <h1 className="text-xl font-bold mb-6">My Orders</h1>

//       {orders.map((order) => (
//         <div key={order._id} className="border rounded-lg mb-6 p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-semibold">Order ID: {order._id.slice(-6)}</h2>
//             <p className="text-sm text-gray-600">
//               Ordered on: {new Date(order.createdAt).toLocaleDateString()}
//             </p>
//           </div>

//           {/* Loop through all items in this order */}
//           <div className="space-y-3">
//             {order.items.map((item, idx) => {
//               const product = item.product || {}; // if backend not populated yet
//               return (
//                 <div
//                   key={idx}
//                   className="flex gap-4 items-center border rounded-lg p-3 hover:shadow-sm cursor-pointer"
//                   onClick={() => product._id && navigate(`/product/${product._id}`)}
//                 >
//                   <div className="w-20 h-20 flex-shrink-0 rounded bg-gray-100 overflow-hidden border">
//                     {product.image ? (
//                       <img
//                         src={getImg(product.image)}
//                         alt={product.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
//                         No Image
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-medium text-gray-900 text-sm">
//                       {product.name || "Unknown Product"}
//                     </h3>
//                     <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
//                     <p className="text-xs text-gray-600">
//                       Price: ₹{product.price || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="flex justify-between items-center mt-4 text-sm">
//             <p>
//               Status:{" "}
//               <span
//                 className={`${
//                   order.status === "Delivered"
//                     ? "text-green-600"
//                     : order.status === "Cancelled"
//                     ? "text-red-600"
//                     : "text-yellow-600"
//                 } font-medium`}
//               >
//                 {order.status}
//               </span>
//             </p>
//             <p className="font-semibold text-gray-900">
//               Total: ₹{order.totalAmount}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { getImg } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axiosInstance.get("/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-900 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No orders yet</h3>
          <p className="text-slate-600">Your order history will appear here once you make your first purchase.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">My Orders</h1>
          <p className="text-slate-600">Track and manage your purchases</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Order ID</p>
                      <p className="font-semibold text-slate-900">#{order._id.slice(-6)}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Order Date</p>
                    <p className="text-sm font-medium text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, idx) => {
                    const product = item.product || {};
                    return (
                      <div
                        key={idx}
                        className="group flex gap-4 items-center rounded-xl p-4 hover:bg-slate-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-slate-200"
                        onClick={() => product._id && navigate(`/product/${product._id}`)}
                      >
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group-hover:scale-105 transition-transform duration-200">
                          {product.image ? (
                            <img
                              src={getImg(product.image)}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors line-clamp-1">
                            {product.name || "Unknown Product"}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium text-slate-500">Quantity:</span>
                              <span className="text-sm font-semibold text-slate-700">{item.quantity}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium text-slate-500">Price:</span>
                              <span className="text-sm font-semibold text-slate-900">₹{product.price || "N/A"}</span>
                            </div>
                          </div>
                        </div>

                        <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Footer */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">Status:</span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-slate-600">Total Amount:</span>
                    <span className="text-2xl font-bold text-slate-900">₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}