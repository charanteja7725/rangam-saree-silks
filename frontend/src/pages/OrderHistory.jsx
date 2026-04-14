import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/my`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5] p-6">
      <Navbar />

      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} className="mb-6 p-4 border rounded bg-white">
            
            <p><b>Total:</b> ₹{order.totalAmount}</p>
            <p><b>City:</b> {order.city}</p>
            <p><b>Phone:</b> {order.phone}</p>

            {/* ✅ Show items */}
            <div className="mt-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <img src={item.image} alt="" className="w-12 h-12 rounded" />
                  <p>{item.name} (₹{item.price} × {item.quantity})</p>
                </div>
              ))}
            </div>

          </div>
        ))
      )}
    </div>
  );
}