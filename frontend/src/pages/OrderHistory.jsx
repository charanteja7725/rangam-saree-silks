import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

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
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fffaf5 0%, #f5f0eb 100%)",
      fontFamily: "'Inter', sans-serif"
    }}>
      <Navbar />

      <div style={{
        maxWidth: "80rem",
        margin: "0 auto",
        padding: "2.5rem 1.5rem"
      }}>
        <h1 style={{
          fontSize: "2.25rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          color: "#7a1f3d",
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "0.02em",
          animation: "fadeIn 0.8s ease-in"
        }}>
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div style={{
            borderRadius: "1.5rem",
            background: "white",
            padding: "2rem",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
          }}>
            <p style={{
              fontSize: "1.1rem",
              color: "#5c4033"
            }}>No orders yet</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "1.5rem"
          }}>
            {orders.map((order, i) => (
              <div
                key={i}
                onClick={() => setExpandedOrder(expandedOrder === i ? null : i)}
                style={{
                  borderRadius: "1.5rem",
                  background: "white",
                  padding: "1.5rem",
                  border: "2px solid #e0d5c7",
                  boxShadow: expandedOrder === i
                    ? "0 12px 28px rgba(122, 31, 61, 0.15)"
                    : "0 4px 12px rgba(0, 0, 0, 0.08)",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: expandedOrder === i ? "translateY(-4px)" : "translateY(0)",
                  animation: `slideInUp 0.6s ease-out ${0.1 + i * 0.05}s backwards`
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
                      color: "#b88917",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "0.25rem"
                    }}>Order #{order._id.slice(-6)}</p>
                    <p style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#7a1f3d",
                      fontFamily: "'Cormorant Garamond', serif"
                    }}>₹{order.totalAmount}</p>
                  </div>
                  <div style={{
                    background: order.status === "pending" ? "#fef3c7" : "#d1fae5",
                    color: order.status === "pending" ? "#b45309" : "#065f46",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    {order.status}
                  </div>
                </div>

                <div style={{
                  borderBottom: "1px solid #e0d5c7",
                  paddingBottom: "1rem",
                  marginBottom: "1rem"
                }}>
                  <p style={{
                    fontSize: "0.9rem",
                    color: "#5c4033",
                    marginBottom: "0.25rem"
                  }}><strong>Address:</strong> {order.address}</p>
                  <p style={{
                    fontSize: "0.9rem",
                    color: "#5c4033",
                    marginBottom: "0.25rem"
                  }}><strong>City:</strong> {order.city}</p>
                  <p style={{
                    fontSize: "0.9rem",
                    color: "#5c4033"
                  }}><strong>Phone:</strong> {order.phone}</p>
                </div>

                {expandedOrder === i && (
                  <div style={{
                    animation: "slideInUp 0.3s ease-out"
                  }}>
                    <h3 style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#7a1f3d",
                      marginBottom: "0.75rem"
                    }}>Items</h3>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem"
                    }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{
                          display: "flex",
                          gap: "0.75rem",
                          alignItems: "center",
                          padding: "0.75rem",
                          borderRadius: "0.75rem",
                          background: "#fffaf5"
                        }}>
                          <img src={item.image} alt="" style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "0.5rem",
                            objectFit: "cover"
                          }} />
                          <div style={{ flex: 1 }}>
                            <p style={{
                              fontSize: "0.9rem",
                              fontWeight: "600",
                              color: "#2f1b1b"
                            }}>{item.name}</p>
                            <p style={{
                              fontSize: "0.85rem",
                              color: "#5c4033"
                            }}>₹{item.price} × {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
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
    </div>
  );
}