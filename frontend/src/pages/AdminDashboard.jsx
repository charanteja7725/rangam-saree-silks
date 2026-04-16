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

  if (!stats) return (<div style={{ padding: "1.5rem", textAlign: "center", fontSize: "1rem" }}>Loading dashboard...</div>);

  // ✅ Chart Data
  const chartData = stats.recentOrders.map(order => ({
    name: order._id.slice(-4),
    amount: order.totalAmount
  }));

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fffaf5",
      color: "#2f1b1b",
      padding: "1.5rem"
    }}>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      <Navbar />

      <h1 style={{
        fontSize: "2.25rem",
        fontWeight: "bold",
        marginBottom: "2rem",
        color: "#7a1f3d",
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: "0.02em"
      }}>
        Admin Dashboard
      </h1>

      {/* ✅ Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2.5rem"
      }}>
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.75rem",
          animation: "slideInUp 0.6s ease-out 0.1s backwards",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer"
        }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <h2 style={{
            fontSize: "1.125rem",
            marginBottom: "0.5rem",
            color: "#5c4033"
          }}>Total Orders</h2>
          <p style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            color: "#7a1f3d"
          }}>{stats.totalOrders}</p>
        </div>

        <div style={{
          padding: "1.5rem",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.75rem",
          animation: "slideInUp 0.6s ease-out 0.15s backwards",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer"
        }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <h2 style={{
            fontSize: "1.125rem",
            marginBottom: "0.5rem",
            color: "#5c4033"
          }}>Total Revenue</h2>
          <p style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            color: "#b88917"
          }}>
            ₹{stats.totalRevenue}
          </p>
        </div>
      </div>

      {/* ✅ Chart Section */}
      <div style={{
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        marginBottom: "2.5rem",
        animation: "slideInUp 0.6s ease-out 0.2s backwards"
      }}>
        <h2 style={{
          fontSize: "1.875rem",
          marginBottom: "1rem",
          fontWeight: "600",
          color: "#7a1f3d",
          fontFamily: "'Cormorant Garamond', serif"
        }}>Revenue Chart</h2>

        {chartData.length === 0 ? (
          <p style={{ color: "#6b4f45" }}>No data for chart</p>
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
      <h2 style={{
        fontSize: "1.875rem",
        marginBottom: "1rem",
        fontWeight: "600",
        color: "#7a1f3d",
        fontFamily: "'Cormorant Garamond', serif"
      }}>Recent Orders</h2>

      {stats.recentOrders.length === 0 ? (
        <p style={{ color: "#6b4f45" }}>No recent orders</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "1rem"
        }}>
          {stats.recentOrders.map((order, index) => (
            <div key={order._id} style={{
              marginBottom: "0.75rem",
              padding: "1rem",
              border: "2px solid #d6bfa8",
              borderRadius: "0.5rem",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              animation: `slideInUp 0.6s ease-out ${0.25 + index * 0.05}s backwards`,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer"
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(122, 31, 61, 0.2)";
                e.currentTarget.style.borderColor = "#7a1f3d";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#d6bfa8";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <p style={{
                fontWeight: "600",
                color: "#7a1f3d",
                fontSize: "1.1rem"
              }}>
                ₹{order.totalAmount} - <span style={{ color: "#b88917" }}>{order.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}