import React, { useEffect } from "react";
import { useVendorStore } from "../lib/vendorStore"; 

function Orders() {
  const { orders, fetchOrders, updateOrderStatus } = useVendorStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-2xl p-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  Order #{order._id.slice(-6)}
                </h3>

                {/* Status dropdown */}
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order._id, e.target.value)
                  }
                  className={`px-2 py-1 rounded font-semibold text-white ${
                    order.status === "delivered"
                      ? "bg-green-500"
                      : order.status === "placed"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                >
                  <option value="placed">Placed</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Customer: {order.buyer?.name} ({order.buyer?.email})
              </p>

              <div className="mt-3">
                <h4 className="font-semibold mb-2">Products:</h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between border p-2 rounded"
                    >
                      <p>{item.product?.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>₹{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-3 font-semibold">
                <span>Total:</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
