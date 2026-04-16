import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.log(err));
  }, []);

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(allCategories)];
  }, [products]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return Number(a.price) - Number(b.price);
    if (sortOrder === "highToLow") return Number(b.price) - Number(a.price);
    return 0;
  });

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
          marginBottom: "2.5rem",
          textAlign: "center",
          animation: "fadeIn 0.8s ease-in"
        }}>
          <p style={{
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#b88917",
            fontWeight: "600"
          }}>
            Premium Collection
          </p>
          <h1 style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            color: "#7a1f3d",
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.02em"
          }}>
            Our Sarees
          </h1>
          <p style={{
            margin: "1rem auto 0",
            maxWidth: "32rem",
            color: "#5c4033",
            fontSize: "0.95rem"
          }}>
            Explore elegant sarees designed for weddings, celebrations, and
            timeless everyday grace.
          </p>
        </div>

        <div style={{
          marginBottom: "2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          borderRadius: "1.5rem",
          background: "white",
          padding: "1.25rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
        }}>
          <input
            type="text"
            placeholder="Search sarees by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              borderRadius: "0.75rem",
              border: "2px solid #d6bfa8",
              background: "white",
              padding: "0.75rem",
              fontSize: "0.95rem",
              outline: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              cursor: "text"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#7a1f3d";
              e.target.style.boxShadow = "0 4px 12px rgba(122, 31, 61, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d6bfa8";
              e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
            }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: "100%",
              borderRadius: "0.75rem",
              border: "2px solid #d6bfa8",
              background: "white",
              padding: "0.75rem",
              fontSize: "0.95rem",
              outline: "none",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#7a1f3d";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d6bfa8";
            }}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              width: "100%",
              borderRadius: "0.75rem",
              border: "2px solid #d6bfa8",
              background: "white",
              padding: "0.75rem",
              fontSize: "0.95rem",
              outline: "none",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#7a1f3d";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d6bfa8";
            }}
          >
            <option value="default">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {sortedProducts.length === 0 ? (
          <div style={{
            borderRadius: "1.5rem",
            background: "white",
            padding: "2.5rem",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            animation: "fadeIn 0.8s ease-in"
          }}>
            <p style={{
              fontSize: "1.1rem",
              color: "#5c4033",
              fontWeight: "500"
            }}>No products found</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "2rem"
          }}>
            {sortedProducts.map((p, idx) => (
              <div
                key={p._id}
                onMouseEnter={() => setHoveredProduct(p._id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  overflow: "hidden",
                  borderRadius: "1.5rem",
                  background: "white",
                  boxShadow: hoveredProduct === p._id
                    ? "0 20px 40px rgba(122, 31, 61, 0.15)"
                    : "0 4px 12px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: hoveredProduct === p._id ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                  cursor: "pointer",
                  animation: `slideInUp 0.6s ease-out ${0.1 + idx * 0.05}s backwards`
                }}
              >
                <div style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "320px",
                  background: "#f5f0eb"
                }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: hoveredProduct === p._id ? "scale(1.08) rotate(1deg)" : "scale(1) rotate(0deg)"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(122, 31, 61, 0) 0%, rgba(122, 31, 61, 0.15) 100%)",
                    opacity: hoveredProduct === p._id ? 1 : 0,
                    transition: "opacity 0.3s ease"
                  }} />
                </div>

                <div style={{
                  padding: "1.25rem"
                }}>
                  <p style={{
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                    color: "#b88917",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    {p.category || "Premium Saree"}
                  </p>

                  <h2 style={{
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#4b2e2e",
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: "0.02em",
                    lineHeight: "1.4"
                  }}>
                    {p.name}
                  </h2>

                  <p style={{
                    marginBottom: "1rem",
                    fontSize: "0.9rem",
                    lineHeight: "1.6",
                    color: "#6b4f45"
                  }}>
                    Elegant craftsmanship with a graceful finish for special occasions.
                  </p>

                  <div style={{
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <p style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#b88917",
                      fontFamily: "'Cormorant Garamond', serif"
                    }}>
                      ₹{p.price}
                    </p>
                  </div>

                  <Link
                    to={`/product/${p._id}`}
                    style={{
                      display: "block",
                      borderRadius: "0.75rem",
                      background: "linear-gradient(135deg, #7a1f3d 0%, #9d2651 100%)",
                      padding: "0.75rem",
                      textAlign: "center",
                      fontWeight: "600",
                      color: "white",
                      textDecoration: "none",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: "scale(1)",
                      boxShadow: "0 4px 12px rgba(122, 31, 61, 0.2)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(122, 31, 61, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(122, 31, 61, 0.2)";
                    }}
                  >
                    View Details
                  </Link>
                </div>
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