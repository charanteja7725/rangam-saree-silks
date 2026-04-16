import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const [hoveredLink, setHoveredLink] = useState(null);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const navStyle = {
    background: "linear-gradient(135deg, #7a1f3d 0%, #9d2651 100%)",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 32px rgba(122, 31, 61, 0.3)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(10px)"
  };

  const logoStyle = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    letterSpacing: "0.15em",
    fontFamily: "'Cormorant Garamond', serif",
    transition: "all 0.3s ease",
    cursor: "pointer"
  };

  const linkContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    fontSize: "0.9rem",
    fontWeight: "500"
  };

  const linkStyle = (name) => ({
    color: "#ffffff",
    textDecoration: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    paddingBottom: "0.25rem",
    borderBottom: hoveredLink === name ? "2px solid #f3d27a" : "2px solid transparent",
    transform: hoveredLink === name ? "translateY(-2px)" : "translateY(0)",
    textShadow: hoveredLink === name ? "0 2px 8px rgba(243, 210, 122, 0.4)" : "none",
    display: "inline-block"
  });

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <h1 style={logoStyle}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>RANGAM</Link>
      </h1>

      {/* Links */}
      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle("home")} onMouseEnter={() => setHoveredLink("home")} onMouseLeave={() => setHoveredLink(null)}>Home</Link>
        <Link to="/products" style={linkStyle("products")} onMouseEnter={() => setHoveredLink("products")} onMouseLeave={() => setHoveredLink(null)}>Products</Link>
        <Link to="/cart" style={linkStyle("cart")} onMouseEnter={() => setHoveredLink("cart")} onMouseLeave={() => setHoveredLink(null)}>Cart</Link>

        {token ? (
          <>
            <Link to="/orders" style={linkStyle("orders")} onMouseEnter={() => setHoveredLink("orders")} onMouseLeave={() => setHoveredLink(null)}>
              My Orders
            </Link>

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <Link to="/admin/dashboard" style={linkStyle("dashboard")} onMouseEnter={() => setHoveredLink("dashboard")} onMouseLeave={() => setHoveredLink(null)}>
                  Dashboard
                </Link>
                <Link to="/admin/products" style={linkStyle("adminProducts")} onMouseEnter={() => setHoveredLink("adminProducts")} onMouseLeave={() => setHoveredLink(null)}>
                  Products
                </Link>
                <Link to="/admin/orders" style={linkStyle("adminOrders")} onMouseEnter={() => setHoveredLink("adminOrders")} onMouseLeave={() => setHoveredLink(null)}>
                  Orders
                </Link>
              </>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                background: "#ffffff",
                color: "#7a1f3d",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
                transform: "scale(1)"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#f3d27a";
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 6px 20px rgba(243, 210, 122, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#ffffff";
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 12px rgba(255, 255, 255, 0.2)";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle("login")} onMouseEnter={() => setHoveredLink("login")} onMouseLeave={() => setHoveredLink(null)}>
              Login
            </Link>
            <Link to="/register" style={linkStyle("register")} onMouseEnter={() => setHoveredLink("register")} onMouseLeave={() => setHoveredLink(null)}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}