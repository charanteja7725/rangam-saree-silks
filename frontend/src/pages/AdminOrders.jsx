import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/all`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (data.success) {
          setOrders(data.orders || []);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    loadOrders();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();

      if (data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="mb-6 text-3xl font-bold">All Orders (Admin)</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="mb-6 rounded border bg-white p-4">
            <p><b>User:</b> {order.user?.email || order.user}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>
            <p><b>City:</b> {order.city}</p>
            <p><b>Status:</b> {order.status}</p>

            <div className="my-3">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="rounded border px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className="mt-3">
              <b>Items:</b>
              {order.items?.map((item, idx) => (
                <p key={idx}>
                  {item.name} (₹{item.price} × {item.quantity})
                </p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}