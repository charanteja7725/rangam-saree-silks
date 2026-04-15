import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

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

  if (!stats) return <p className="p-6">Loading dashboard...</p>;

  // ✅ Chart Data
  const chartData = stats.recentOrders.map(order => ({
    name: order._id.slice(-4),
    amount: order.totalAmount
  }));

  

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b] p-6">
      <Navbar />

      <h1 className="text-4xl font-bold mb-8 text-[#7a1f3d]">
        Admin Dashboard
      </h1>

      {/* ✅ Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-lg">Total Orders</h2>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-lg">Total Revenue</h2>
          <p className="text-2xl font-bold text-[#b88917]">
            ₹{stats.totalRevenue}
          </p>
        </div>
      </div>

      {/* ✅ Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl mb-4 font-semibold">Revenue Chart</h2>

        {chartData.length === 0 ? (
          <p>No data for chart</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#7a1f3d" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ✅ Recent Orders */}
      <h2 className="text-2xl mb-4">Recent Orders</h2>

      {stats.recentOrders.length === 0 ? (
        <p>No recent orders</p>
      ) : (
        stats.recentOrders.map((order) => (
          <div key={order._id} className="mb-3 p-4 border rounded bg-white shadow">
            <p className="font-semibold">
              ₹{order.totalAmount} - {order.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}