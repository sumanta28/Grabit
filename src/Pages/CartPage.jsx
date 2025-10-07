// // import React, { useEffect, useState } from "react";
// // import axiosInstance from "../lib/axiosInstance";

// // export default function CartPage() {
// //   const [cart, setCart] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const fetchCart = async () => {
// //     try {
// //       const res = await axiosInstance.get("/carts");
// //       console.log("Cart response:", res.data);
// //       setCart(res.data);
// //     } catch (error) {
// //       console.error("Error fetching cart:", error.response?.data || error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCart();
// //   }, []);

// //   if (loading) return <p className="text-center mt-10">Loading your cart...</p>;
// //   if (!cart || !cart.items?.length) return <p className="text-center mt-10">Your cart is empty 🛒</p>;

// //   return (
// //     <div className="p-4 max-w-3xl mx-auto">
// //       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
// //       <div className="space-y-4">
// //         {cart.items.map((item) => (
// //           <div key={item._id} className="flex items-center justify-between border p-3 rounded-lg">
// //             <div>
// //               <p className="font-semibold">{item.product?.name}</p>
// //               <p>Qty: {item.quantity}</p>
// //               <p>Price: ₹{item.product?.price}</p>
// //             </div>
// //             <img
// //               src={`https://bazario-backend-vmlz.onrender.com${item.product?.image}`}
// //               alt={item.product?.name}
// //               className="w-20 h-20 object-cover rounded"
// //             />
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import axiosInstance from "../lib/axiosInstance";
// import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
// import { useNotification } from "../context/NotificationContext";


// export default function CartPage() {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { addNotification } = useNotification();


//   const fetchCart = async () => {
//     try {
//       const res = await axiosInstance.get("/carts");
//       setCart(res.data);
//       console.log("Cart response:", res.data);
//     } catch (error) {
//       console.error("Error fetching cart:", error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // ✅ Update quantity
// const updateQuantity = async (itemId, newQuantity) => {
//   newQuantity = Number(newQuantity); // force it to be a number
//   if (newQuantity < 1) return;

//   try {
//     // Optimistic UI update
//     setCart((prevCart) => ({
//       ...prevCart,
//       items: prevCart.items.map((item) =>
//         item._id === itemId ? { ...item, quantity: newQuantity } : item
//       ),
//     }));

//     // Backend update
//     const res = await axiosInstance.put(`/carts/${itemId}`, { quantity: newQuantity });
//     setCart(res.data);
//     addNotification("Cart updated successfully 🛍️", "success");
//   } catch (error) {
//     console.error("Error updating quantity:", error.response?.data || error.message);
//     fetchCart(); // revert if failed
//   }
// };


//   // ✅ Remove item
// const removeItem = async (itemId) => {
//   try {
//     setCart((prevCart) => ({
//       ...prevCart,
//       items: prevCart.items.filter((item) => item._id !== itemId),
//     }));
//     await axiosInstance.delete(`/carts/${itemId}`);
//     await fetchCart();
//     addNotification("Item removed from cart 🗑️", "error");
//   } catch (error) {
//     console.error("Error removing item:", error.response?.data || error.message);
//     fetchCart();
//   }
// };



//  const calculateTotal = () => {
//   return cart?.items?.reduce((total, item) => {
//     const price = Number(item.product?.price) || 0;
//     const quantity = Number(item.quantity) || 0;
//     return total + price * quantity;
//   }, 0);
// };

//   const calculateSavings = () => {
//     return Math.floor(calculateTotal() * 0.15);
//   };

//   // ✅ Loading UI
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900 mb-4"></div>
//           <p className="text-slate-600 font-medium">Loading your cart...</p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Empty cart UI
//   if (!cart || !cart.items?.length) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
//         <div className="text-center">
//           <div className="w-24 h-24 mx-auto mb-6 bg-slate-200 rounded-full flex items-center justify-center">
//             <ShoppingBag className="w-12 h-12 text-slate-400" />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
//           <p className="text-slate-500 mb-6">Looks like you haven't added anything yet</p>
//           <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
//             Start Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Main cart UI
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
//           <p className="text-slate-600">{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart</p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* 🛒 Cart Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {cart.items.map((item) => (
//               <div key={item._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 hover:shadow-md transition-shadow">
//                 <div className="flex gap-4">
//                   {/* Product Image */}
//                   <div className="flex-shrink-0">
//                     <img
//                       src={`https://bazario-backend-vmlz.onrender.com${item.product?.image}`}
//                       alt={item.product?.name}
//                       className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-slate-100"
//                     />
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex justify-between items-start mb-3">
//                       <div>
//                         <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.product?.name}</h3>
//                         <p className="text-slate-500 text-sm">In Stock</p>
//                       </div>
//                       <button
//                         onClick={() => removeItem(item._id)}
//                         className="text-slate-400 hover:text-red-500 transition-colors p-1"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       {/* Quantity Controls */}
//                       <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                           disabled={item.quantity <= 1}
//                           className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors disabled:opacity-50"
//                         >
//                           <Minus className="w-4 h-4 text-slate-600" />
//                         </button>
//                         <span className="font-medium text-slate-900 w-8 text-center">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                           className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
//                         >
//                           <Plus className="w-4 h-4 text-slate-600" />
//                         </button>
//                       </div>

//                       {/* Price */}
//                       <div className="text-right">
//                         <p className="text-xl font-bold text-slate-900">₹{(item.product?.price * item.quantity).toLocaleString()}</p>
//                         <p className="text-sm text-slate-500">₹{item.product?.price} each</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* 💳 Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-4">
//               <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

//               <div className="space-y-4 mb-6">
//                 <div className="flex justify-between text-slate-600">
//                   <span>Subtotal</span>
//                   <span className="font-medium">₹{calculateTotal().toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-slate-600">
//                   <span>Shipping</span>
//                   <span className="font-medium text-green-600">Free</span>
//                 </div>
//                 <div className="flex justify-between text-green-600">
//                   <span>Savings</span>
//                   <span className="font-medium">-₹{calculateSavings().toLocaleString()}</span>
//                 </div>
//                 <div className="border-t border-slate-200 pt-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-semibold text-slate-900">Total</span>
//                     <span className="text-2xl font-bold text-slate-900">
//                       ₹{(calculateTotal() - calculateSavings()).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <button className="w-full bg-slate-900 text-white py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group mb-3">
//                 Proceed to Checkout
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>

//               <button className="w-full border-2 border-slate-200 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
//                 Continue Shopping
//               </button>

//               <div className="mt-6 pt-6 border-t border-slate-200">
//                 <p className="text-sm text-slate-600 flex items-center gap-2">
//                   <span className="text-green-600">✓</span>
//                   Free delivery on orders above ₹500
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  // ✅ Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/carts");
      setCart(res.data || { items: [] });
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Update quantity safely
  const updateQuantity = async (itemId, newQuantity) => {
    newQuantity = Number(newQuantity); // ensure number
    if (newQuantity < 1) return;

    try {
      // Optimistic UI update
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        ),
      }));

      // Backend update
      await axiosInstance.put(`/carts/${itemId}`, { quantity: newQuantity });
      addNotification("Cart updated successfully 🛍️", "success");
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error.message);
      fetchCart(); // revert if failed
    }
  };

  // ✅ Remove item safely
  const removeItem = async (itemId) => {
    try {
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item._id !== itemId),
      }));
      await axiosInstance.delete(`/carts/${itemId}`);
      addNotification("Item removed from cart 🗑️", "error");
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error.message);
      fetchCart();
    }
  };

  // ✅ Calculate total safely
  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = Number(item.product?.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  const calculateSavings = () => Math.floor(calculateTotal() * 0.15);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // ✅ Empty cart UI
  if (!cart.items.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-slate-200 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-6">Looks like you haven't added anything yet</p>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main cart UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
          <p className="text-slate-600">{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 🛒 Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={`https://bazario-backend-vmlz.onrender.com${item.product?.image}`}
                      alt={item.product?.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-slate-100"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.product?.name}</h3>
                        <p className="text-slate-500 text-sm">In Stock</p>
                      </div>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4 text-slate-600" />
                        </button>
                        <span className="font-medium text-slate-900 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, Number(item.quantity) + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                        >
                          <Plus className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl font-bold text-slate-900">
                          ₹{((Number(item.product?.price) || 0) * Number(item.quantity)).toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-500">₹{item.product?.price} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 💳 Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Savings</span>
                  <span className="font-medium">-₹{calculateSavings().toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-slate-900">
                      ₹{(calculateTotal() - calculateSavings()).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group mb-3">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="w-full border-2 border-slate-200 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                Continue Shopping
              </button>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Free delivery on orders above ₹500
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
