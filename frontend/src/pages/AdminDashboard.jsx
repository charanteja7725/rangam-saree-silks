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
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data);
      });
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
        <Navbar />
        <p className="px-6 py-10 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  const chartData = stats.recentOrders.map((order) => ({
    name: order._id.slice(-4),
    amount: order.totalAmount
  }));

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#b88917]">
            Admin Panel
          </p>
          <h1 className="text-5xl font-bold text-[#7a1f3d] md:text-6xl">
            Admin Dashboard
          </h1>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-md transition duration-300 hover:shadow-2xl">
            <h2 className="mb-2 text-lg text-[#5c4033]">Total Orders</h2>
            <p className="text-3xl font-bold text-[#7a1f3d]">
              {stats.totalOrders}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md transition duration-300 hover:shadow-2xl">
            <h2 className="mb-2 text-lg text-[#5c4033]">Total Revenue</h2>
            <p className="text-3xl font-bold text-[#b88917]">
              ₹{stats.totalRevenue}
            </p>
          </div>
        </div>

        <div className="mb-10 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-3xl font-bold text-[#7a1f3d]">
            Revenue Chart
          </h2>

          {chartData.length === 0 ? (
            <p className="text-[#5c4033]">No data for chart</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#7a1f3d" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-bold text-[#7a1f3d]">
            Recent Orders
          </h2>

          {stats.recentOrders.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 shadow-md">
              <p className="text-[#5c4033]">No recent orders</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-2xl bg-white p-5 shadow-md transition duration-300 hover:shadow-xl"
                >
                  <p className="text-lg font-semibold text-[#4b2e2e]">
                    ₹{order.totalAmount} -{" "}
                    <span className="text-[#b88917]">{order.status}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}