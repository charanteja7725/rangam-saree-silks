import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product))
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(existingCart));
    navigate("/cart");
  };

  if (!product) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fffaf5 0%, #f5f0eb 100%)",
        color: "#2f1b1b"
      }}>
        <Navbar />
        <p style={{ padding: "2.5rem 1.5rem", fontSize: "1.1rem" }}>Loading...</p>
      </div>
    );
  }

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
        maxWidth: "80rem",
        padding: "2.5rem 1.5rem"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2.5rem",
          alignItems: "start"
        }}>
          <div style={{
            overflow: "hidden",
            borderRadius: "1.875rem",
            background: "white",
            boxShadow: "0 20px 40px rgba(122, 31, 61, 0.15)",
            transition: "all 0.3s ease"
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                height: "520px",
                width: "100%",
                objectFit: "cover",
                transition: "all 0.3s ease",
                transform: "scale(1)"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            />
          </div>

          <div style={{
            borderRadius: "1.875rem",
            background: "white",
            padding: "2rem",
            boxShadow: "0 20px 40px rgba(122, 31, 61, 0.15)",
            animation: "slideInUp 0.8s ease-out"
          }}>
            <p style={{
              marginBottom: "0.75rem",
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#b88917",
              fontWeight: "600"
            }}>
              Premium Collection
            </p>

            <h1 style={{
              marginBottom: "1rem",
              fontSize: "2.25rem",
              fontWeight: "bold",
              color: "#7a1f3d",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "0.02em"
            }}>
              {product.name}
            </h1>

            <p style={{
              marginBottom: "1.5rem",
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#b88917",
              fontFamily: "'Cormorant Garamond', serif"
            }}>
              ₹{product.price}
            </p>

            <p style={{
              borderLeft: "4px solid #b88917",
              paddingLeft: "1rem",
              lineHeight: "1.75",
              color: "#5c4033",
              marginBottom: "2rem"
            }}>
              {product.description}
            </p>

            <div style={{
              marginTop: "2rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem"
            }}>
              <div style={{
                borderRadius: "1.5rem",
                background: "#fffaf5",
                padding: "1rem",
                border: "1px solid #e0d5c7"
              }}>
                <p style={{ fontSize: "0.875rem", color: "#7a1f3d", fontWeight: "600" }}>Category</p>
                <p style={{ marginTop: "0.25rem", fontWeight: "600", color: "#2f1b1b" }}>
                  {product.category}
                </p>
              </div>

              <div style={{
                borderRadius: "1.5rem",
                background: "#fffaf5",
                padding: "1rem",
                border: "1px solid #e0d5c7"
              }}>
                <p style={{ fontSize: "0.875rem", color: "#7a1f3d", fontWeight: "600" }}>Stock</p>
                <p style={{ marginTop: "0.25rem", fontWeight: "600", color: "#2f1b1b" }}>
                  {product.stock}
                </p>
              </div>
            </div>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              <button
                onClick={addToCart}
                onMouseEnter={() => setHoveredButton("addCart")}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  borderRadius: "0.75rem",
                  background: "linear-gradient(135deg, #7a1f3d 0%, #9d2651 100%)",
                  padding: "0.75rem 1.5rem",
                  fontWeight: "600",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: hoveredButton === "addCart" ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: hoveredButton === "addCart"
                    ? "0 12px 28px rgba(122, 31, 61, 0.35)"
                    : "0 4px 12px rgba(122, 31, 61, 0.2)"
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate("/products")}
                onMouseEnter={() => setHoveredButton("back")}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  borderRadius: "0.75rem",
                  border: "2px solid #b88917",
                  padding: "0.75rem 1.5rem",
                  fontWeight: "600",
                  color: hoveredButton === "back" ? "white" : "#b88917",
                  background: hoveredButton === "back" ? "#b88917" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: hoveredButton === "back" ? "translateY(-3px) scale(1.05)" : "translateY(0) scale(1)",
                  boxShadow: hoveredButton === "back"
                    ? "0 12px 28px rgba(184, 137, 23, 0.35)"
                    : "none"
                }}
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
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