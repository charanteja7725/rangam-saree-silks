import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/stats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data);
      });
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="p-4 bg-white shadow rounded">
          <h2>Total Orders</h2>
          <p className="text-xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2>Total Revenue</h2>
          <p className="text-xl font-bold">₹{stats.totalRevenue}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <h2 className="text-2xl mb-4">Recent Orders</h2>

      {stats.recentOrders.map((order) => (
        <div key={order._id} className="mb-3 p-3 border rounded">
          <p>₹{order.totalAmount} - {order.status}</p>
        </div>
      ))}
    </div>
  );
}