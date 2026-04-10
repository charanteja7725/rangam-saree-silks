import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="brand-font mb-8 text-4xl font-bold text-[#7a1f3d]">
          Order History
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl bg-white p-6 shadow-md">
              <p className="font-semibold text-[#7a1f3d]">
                Order ID: {order._id}
              </p>
              <p className="text-[#5c4033]">City: {order.city}</p>
              <p className="text-[#5c4033]">Phone: {order.phone}</p>
              <p className="font-bold text-[#b88917]">₹{order.totalPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}