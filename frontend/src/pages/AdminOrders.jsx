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
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#b88917]">
            Admin Panel
          </p>
          <h1 className="text-5xl font-bold text-[#7a1f3d] md:text-6xl">
            All Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-md">
            <p className="text-lg text-[#5c4033]">No orders found</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="rounded-3xl bg-white p-6 shadow-md transition duration-300 hover:shadow-2xl"
              >
                <div className="mb-6 flex flex-col gap-4 border-b border-[#eee2d7] pb-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#b88917]">
                      Order #{index + 1}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#7a1f3d]">
                      ₹{order.totalAmount}
                    </h2>
                  </div>

                  <div className="grid gap-2 text-sm text-[#5c4033] md:text-right">
                    <p>
                      <span className="font-semibold text-[#2f1b1b]">User:</span>{" "}
                      {order.user?.email || order.user}
                    </p>
                    <p>
                      <span className="font-semibold text-[#2f1b1b]">City:</span>{" "}
                      {order.city}
                    </p>
                    <p>
                      <span className="font-semibold text-[#2f1b1b]">Status:</span>{" "}
                      <span className="font-medium text-[#b88917]">
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mb-5">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="rounded-xl border border-[#e7d7c9] bg-white px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <div>
                  <p className="mb-4 text-lg font-semibold text-[#4b2e2e]">
                    Items
                  </p>

                  <div className="space-y-4">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 rounded-2xl bg-[#fffaf5] p-4"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-2xl object-cover"
                          />
                        )}

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#4b2e2e]">
                            {item.name}
                          </h3>
                          <p className="text-sm text-[#5c4033]">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}