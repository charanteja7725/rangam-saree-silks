import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/all`, {
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
    <div className="p-6">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">All Orders (Admin)</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} className="mb-6 p-4 border rounded bg-white">
            <p><b>User:</b> {order.user}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>
            <p><b>City:</b> {order.city}</p>

            {/* ✅ STATUS DROPDOWN */}
            <div className="my-2">
              <b>Status:</b>{" "}
              <select
                value={order.status}
                onChange={async (e) => {
                  await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${order._id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ status: e.target.value })
                  });
                  window.location.reload();
                }}
                className="border px-2 py-1 ml-2"
              >
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>

            {/* Items */}
            {order.items.map((item, idx) => (
              <p key={idx}>
                {item.name} (₹{item.price} × {item.quantity})
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
}