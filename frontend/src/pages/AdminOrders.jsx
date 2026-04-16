import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#fef3c7", color: "#b45309", borderColor: "#fcd34d" };
      case "Shipped":
        return { backgroundColor: "#dbeafe", color: "#1e40af", borderColor: "#93c5fd" };
      case "Delivered":
        return { backgroundColor: "#d1fae5", color: "#065f46", borderColor: "#6ee7b7" };
      default:
        return { backgroundColor: "#f3f4f6", color: "#4b5563", borderColor: "#e5e7eb" };
    }
  };

  return (
    <div style={{
      padding: "1.5rem",
      minHeight: "100vh",
      backgroundColor: "#fffaf5"
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
      `}</style>

      <Navbar />
      <h1 style={{
        marginBottom: "1.5rem",
        fontSize: "1.875rem",
        fontWeight: "bold",
        color: "#7a1f3d",
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: "0.02em"
      }}>
        All Orders (Admin)
      </h1>

      {orders.length === 0 ? (
        <p style={{ color: "#5c4033", fontSize: "1rem" }}>No orders found</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "1.5rem"
        }}>
          {orders.map((order, index) => (
            <div
              key={order._id}
              style={{
                borderRadius: "0.75rem",
                border: "2px solid #d6bfa8",
                backgroundColor: "#ffffff",
                padding: "1.25rem",
                animation: `slideInUp 0.6s ease-out ${0.1 + index * 0.05}s backwards`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                maxHeight: expandedOrder === order._id ? "600px" : "auto",
                overflow: "hidden"
              }}
              onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(122, 31, 61, 0.2)";
                e.currentTarget.style.borderColor = "#7a1f3d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#d6bfa8";
              }}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem"
              }}>
                <div>
                  <p style={{
                    fontSize: "0.875rem",
                    color: "#6b4f45",
                    marginBottom: "0.25rem"
                  }}>
                    <strong>User:</strong> {order.user?.email || order.user}
                  </p>
                  <p style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#7a1f3d"
                  }}>
                    ₹{order.totalAmount}
                  </p>
                </div>
                <div style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  border: `2px solid ${getStatusBadgeColor(order.status).borderColor}`,
                  ...getStatusBadgeColor(order.status),
                  fontSize: "0.875rem",
                  fontWeight: "600"
                }}>
                  {order.status}
                </div>
              </div>

              <p style={{
                fontSize: "0.875rem",
                color: "#6b4f45",
                marginBottom: "1rem"
              }}>
                <strong>City:</strong> {order.city}
              </p>

              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                style={{
                  borderRadius: "0.375rem",
                  border: "2px solid #d6bfa8",
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.875rem",
                  backgroundColor: "#ffffff",
                  color: "#2f1b1b",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  marginBottom: "1rem"
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#7a1f3d";
                  e.target.style.boxShadow = "0 2px 8px rgba(122, 31, 61, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#d6bfa8";
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>

              <div style={{
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: "1px solid #e5d5c8",
                maxHeight: expandedOrder === order._id ? "300px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out"
              }}>
                <strong style={{
                  color: "#7a1f3d",
                  display: "block",
                  marginBottom: "0.75rem"
                }}>
                  Items:
                </strong>
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "#f5f0eb",
                      borderRadius: "0.375rem",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#4b2e2e"
                    }}
                  >
                    {item.name} (₹{item.price} × {item.quantity})
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}