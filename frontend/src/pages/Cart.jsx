import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return savedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1
    }));
  });

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const removeAll = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fffaf5 0%, #f5f0eb 100%)",
      color: "#2f1b1b",
      fontFamily: "'Inter', sans-serif"
    }}>
      <Navbar />

      <div style={{
        margin: "0 auto",
        maxWidth: "72rem",
        padding: "2.5rem 1.5rem"
      }}>
        <h1 style={{
          marginBottom: "2rem",
          fontSize: "2.25rem",
          fontWeight: "bold",
          color: "#7a1f3d",
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "0.02em",
          animation: "fadeIn 0.8s ease-in"
        }}>
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div style={{
            borderRadius: "1.5rem",
            background: "white",
            padding: "2rem",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            animation: "fadeIn 0.8s ease-in"
          }}>
            <p style={{
              fontSize: "1.1rem",
              color: "#5c4033",
              marginBottom: "1rem"
            }}>Your cart is empty</p>
            <Link
              to="/products"
              onMouseEnter={() => setHoveredButton("continue")}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                display: "inline-block",
                borderRadius: "0.5rem",
                background: "linear-gradient(135deg, #7a1f3d 0%, #9d2651 100%)",
                padding: "0.75rem 1.25rem",
                color: "white",
                textDecoration: "none",
                marginTop: "1rem",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: hoveredButton === "continue" ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hoveredButton === "continue"
                  ? "0 12px 28px rgba(122, 31, 61, 0.35)"
                  : "0 4px 12px rgba(122, 31, 61, 0.2)",
                fontWeight: "600"
              }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem"
            }}>
              {cart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    borderRadius: "1.5rem",
                    background: "white",
                    padding: "1rem",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: "scale(1)",
                    animation: `slideInUp 0.6s ease-out ${0.1 + index * 0.05}s backwards`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 12px 28px rgba(122, 31, 61, 0.15)";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      height: "96px",
                      width: "96px",
                      borderRadius: "0.75rem",
                      objectFit: "cover",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#4b2e2e",
                      marginBottom: "0.25rem",
                      letterSpacing: "0.02em"
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      marginTop: "0.25rem",
                      fontWeight: "600",
                      color: "#b88917"
                    }}>
                      ₹{item.price}
                    </p>

                    <div style={{
                      marginTop: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem"
                    }}>
                      <button
                        onClick={() => decreaseQuantity(index)}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#b88917";
                          e.target.style.color = "white";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "transparent";
                          e.target.style.color = "#b88917";
                          e.target.style.transform = "scale(1)";
                        }}
                        style={{
                          borderRadius: "0.375rem",
                          border: "2px solid #b88917",
                          padding: "0.25rem 0.75rem",
                          color: "#b88917",
                          background: "transparent",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontWeight: "600"
                        }}
                      >
                        −
                      </button>

                      <span style={{
                        fontWeight: "600",
                        minWidth: "2rem",
                        textAlign: "center"
                      }}>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(index)}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#b88917";
                          e.target.style.color = "white";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "transparent";
                          e.target.style.color = "#b88917";
                          e.target.style.transform = "scale(1)";
                        }}
                        style={{
                          borderRadius: "0.375rem",
                          border: "2px solid #b88917",
                          padding: "0.25rem 0.75rem",
                          color: "#b88917",
                          background: "transparent",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontWeight: "600"
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#dc2626";
                      e.target.style.color = "white";
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.color = "#dc2626";
                      e.target.style.transform = "scale(1)";
                    }}
                    style={{
                      borderRadius: "0.375rem",
                      border: "2px solid #dc2626",
                      padding: "0.5rem 1rem",
                      color: "#dc2626",
                      background: "transparent",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontWeight: "600",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{
              height: "fit-content",
              borderRadius: "1.5rem",
              background: "white",
              padding: "1.5rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              position: "sticky",
              top: "2rem",
              animation: "slideInRight 0.8s ease-out"
            }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                marginBottom: "1rem",
                fontSize: "1.875rem",
                fontWeight: "bold",
                color: "#7a1f3d",
                letterSpacing: "0.02em"
              }}>
                Order Summary
              </h2>

              <div style={{
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#5c4033",
                fontSize: "0.95rem"
              }}>
                <span>Total Items</span>
                <span style={{ fontWeight: "600" }}>{totalItems}</span>
              </div>

              <div style={{
                marginBottom: "1.5rem",
                paddingBottom: "1.5rem",
                borderBottom: "2px solid #e0d5c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#4b2e2e"
              }}>
                <span>Total</span>
                <span style={{
                  color: "#b88917",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem"
                }}>₹{totalPrice.toFixed(2)}</span>
              </div>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem"
              }}>
                <Link
                  to="/checkout"
                  onMouseEnter={() => setHoveredButton("checkout")}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    display: "block",
                    borderRadius: "0.5rem",
                    background: "linear-gradient(135deg, #7a1f3d 0%, #9d2651 100%)",
                    padding: "0.75rem 1rem",
                    textAlign: "center",
                    color: "white",
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontWeight: "600",
                    transform: hoveredButton === "checkout" ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: hoveredButton === "checkout"
                      ? "0 12px 28px rgba(122, 31, 61, 0.35)"
                      : "0 4px 12px rgba(122, 31, 61, 0.2)"
                  }}
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={removeAll}
                  onMouseEnter={() => setHoveredButton("clearCart")}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    width: "100%",
                    borderRadius: "0.5rem",
                    border: "2px solid #dc2626",
                    padding: "0.75rem 1rem",
                    color: hoveredButton === "clearCart" ? "white" : "#dc2626",
                    background: hoveredButton === "clearCart" ? "#dc2626" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontWeight: "600",
                    fontSize: "0.95rem"
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
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
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}