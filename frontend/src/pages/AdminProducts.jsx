import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const fetchProducts = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      alert("Product deleted successfully");
      fetchProducts();
    } else {
      alert(data.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{
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

      <div style={{
        margin: "0 auto",
        maxWidth: "80rem",
        padding: "2.5rem 1.5rem"
      }}>
        <h1 style={{
          marginBottom: "2rem",
          fontSize: "2.25rem",
          fontWeight: "bold",
          color: "#7a1f3d",
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "0.02em"
        }}>
          Admin Products
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2rem"
        }}>
          {products.length === 0 ? (
            <p style={{ color: "#5c4033" }}>No products found</p>
          ) : (
            products.map((p, index) => (
              <div
                key={p._id}
                style={{
                  overflow: "hidden",
                  borderRadius: "1rem",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  animation: `slideInUp 0.6s ease-out ${0.1 + index * 0.05}s backwards`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer"
                }}
                onMouseEnter={() => setHoveredProduct(p._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div style={{
                  position: "relative",
                  height: "18rem",
                  overflow: "hidden"
                }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                </div>

                <div style={{
                  padding: "1.25rem"
                }}>
                  <h2 style={{
                    marginBottom: "0.5rem",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#4b2e2e",
                    fontFamily: "'Cormorant Garamond', serif"
                  }}>
                    {p.name}
                  </h2>
                  <p style={{
                    marginBottom: "0.5rem",
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "#b88917"
                  }}>
                    ₹{p.price}
                  </p>
                  <p style={{
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                    color: "#6b4f45"
                  }}>
                    Category: {p.category}
                  </p>
                  <p style={{
                    marginBottom: "1rem",
                    fontSize: "0.875rem",
                    color: "#6b4f45"
                  }}>
                    Stock: {p.stock}
                  </p>

                  <div style={{
                    display: "flex",
                    gap: "0.75rem"
                  }}>
                    <Link
                      to={`/admin/edit-product/${p._id}`}
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#2563eb",
                        padding: "0.5rem 1rem",
                        color: "#ffffff",
                        textDecoration: "none",
                        fontWeight: "600",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        flex: 1,
                        textAlign: "center"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#1d4ed8";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#2563eb";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#dc2626",
                        padding: "0.5rem 1rem",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: "600",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        flex: 1
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#b91c1c";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#dc2626";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}