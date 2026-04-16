import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fffaf5 0%, #f5f0eb 100%)",
      color: "#2f1b1b",
      fontFamily: "'Inter', sans-serif"
    }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "3rem",
        maxWidth: "80rem",
        padding: "4rem 1.5rem",
        alignItems: "center",
        animation: "fadeIn 0.8s ease-in"
      }}>
        <div style={{
          animation: "slideInLeft 0.8s ease-out"
        }}>
          <p style={{
            marginBottom: "0.75rem",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#b88917",
            fontWeight: "600",
            animation: "fadeInDown 0.8s ease-out 0.1s backwards"
          }}>
            Pure Elegance
          </p>

          <h1 style={{
            marginBottom: "1.5rem",
            fontSize: "3.5rem",
            fontWeight: "bold",
            lineHeight: "1.2",
            color: "#7a1f3d",
            fontFamily: "'Cormorant Garamond', serif",
            animation: "fadeInDown 0.8s ease-out 0.2s backwards",
            letterSpacing: "0.02em"
          }}>
            Rangam Pure Silk Sarees
          </h1>

          <p style={{
            marginBottom: "2rem",
            maxWidth: "32rem",
            fontSize: "1.125rem",
            lineHeight: "2",
            color: "#5c4033",
            animation: "fadeInUp 0.8s ease-out 0.3s backwards"
          }}>
            Discover timeless sarees crafted with tradition, elegance, and
            premium quality. Designed for weddings, celebrations, and every
            graceful moment.
          </p>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            animation: "fadeInUp 0.8s ease-out 0.4s backwards"
          }}>
            <Link
              to="/products"
              onMouseEnter={() => setHoveredButton("shop")}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, #7a1f3d 0%, #9d2651 100%)",
                padding: "0.75rem 1.5rem",
                fontWeight: "600",
                color: "white",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                transform: hoveredButton === "shop" ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hoveredButton === "shop"
                  ? "0 12px 28px rgba(122, 31, 61, 0.35)"
                  : "0 6px 16px rgba(122, 31, 61, 0.2)",
                display: "inline-block"
              }}
            >
              Shop Collection
            </Link>

            <Link
              to="/login"
              onMouseEnter={() => setHoveredButton("login")}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                borderRadius: "0.75rem",
                border: "2px solid #b88917",
                padding: "0.75rem 1.5rem",
                fontWeight: "600",
                color: hoveredButton === "login" ? "white" : "#b88917",
                textDecoration: "none",
                background: hoveredButton === "login" ? "#b88917" : "transparent",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                transform: hoveredButton === "login" ? "translateY(-3px) scale(1.05)" : "translateY(0) scale(1)",
                boxShadow: hoveredButton === "login"
                  ? "0 12px 28px rgba(184, 137, 23, 0.35)"
                  : "none",
                display: "inline-block"
              }}
            >
              Login
            </Link>
          </div>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          animation: "slideInRight 0.8s ease-out"
        }}>
          <img
            src="https://weaverstory.com/cdn/shop/files/IMG_3763_5ac30645-9313-4a63-ad40-6ca589ca28fc.jpg?v=1739785983"
            alt="Silk Saree"
            style={{
              height: "520px",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "1.875rem",
              objectFit: "cover",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              transform: "scale(1)",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.03) rotate(1deg)";
              e.target.style.boxShadow = "0 30px 60px rgba(122, 31, 61, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1) rotate(0deg)";
              e.target.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
            }}
          />
        </div>
      </section>

      {/* Highlights */}
      <section style={{
        margin: "0 auto",
        maxWidth: "80rem",
        padding: "0 1.5rem 4rem",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem"
        }}>
          {[
            { title: "Premium Quality", desc: "Carefully selected silk sarees with rich texture, elegant finish, and luxurious feel.", icon: "✨" },
            { title: "Timeless Designs", desc: "Traditional craftsmanship blended with modern styling for every special occasion.", icon: "👑" },
            { title: "Trusted Elegance", desc: "A curated collection made to bring confidence, beauty, and grace to your wardrobe.", icon: "💎" }
          ].map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                borderRadius: "1.5rem",
                background: "white",
                padding: "1.5rem",
                boxShadow: hoveredCard === idx
                  ? "0 20px 40px rgba(122, 31, 61, 0.15)"
                  : "0 4px 12px rgba(0, 0, 0, 0.08)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: hoveredCard === idx ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                cursor: "pointer",
                borderTop: hoveredCard === idx ? "3px solid #7a1f3d" : "3px solid transparent",
                animation: `slideInUp 0.8s ease-out ${0.5 + idx * 0.1}s backwards`
              }}
            >
              <div style={{
                fontSize: "2.5rem",
                marginBottom: "0.5rem",
                transition: "all 0.3s ease",
                transform: hoveredCard === idx ? "scale(1.1)" : "scale(1)"
              }}>
                {item.icon}
              </div>
              <h3 style={{
                marginBottom: "0.5rem",
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#7a1f3d",
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.02em",
                transition: "all 0.3s ease",
                transform: hoveredCard === idx ? "translateX(5px)" : "translateX(0)"
              }}>
                {item.title}
              </h3>
              <p style={{
                color: "#5c4033",
                lineHeight: "1.6",
                fontSize: "0.95rem"
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Banner */}
      <section style={{
        margin: "0 auto",
        maxWidth: "80rem",
        padding: "0 1.5rem 4rem",
      }}>
        <div style={{
          borderRadius: "1.875rem",
          background: "linear-gradient(135deg, #7a1f3d 0%, #9d2651 100%)",
          padding: "3rem",
          color: "white",
          boxShadow: "0 20px 50px rgba(122, 31, 61, 0.3)",
          transition: "all 0.3s ease",
          transform: "translateY(0)",
          animation: "slideInUp 0.8s ease-out 0.7s backwards",
          hover: "box-shadow: 0 30px 60px rgba(122, 31, 61, 0.4)"
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 30px 60px rgba(122, 31, 61, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 20px 50px rgba(122, 31, 61, 0.3)";
          }}
        >
          <p style={{
            marginBottom: "0.75rem",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#f3d27a",
            fontWeight: "600"
          }}>
            Exclusive Collection
          </p>
          <h2 style={{
            marginBottom: "1rem",
            fontSize: "2.25rem",
            fontWeight: "bold",
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.02em"
          }}>
            Celebrate Tradition with Luxury
          </h2>
          <p style={{
            marginBottom: "1.5rem",
            maxWidth: "32rem",
            color: "rgba(255, 255, 255, 0.9)",
            lineHeight: "1.8",
            fontSize: "1rem"
          }}>
            Explore premium silk sarees perfect for weddings, festive moments,
            and elegant celebrations.
          </p>

          <Link
            to="/products"
            onMouseEnter={() => setHoveredButton("explore")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              display: "inline-block",
              borderRadius: "0.75rem",
              background: "white",
              padding: "0.75rem 1.5rem",
              fontWeight: "600",
              color: "#7a1f3d",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              transform: hoveredButton === "explore" ? "scale(1.05)" : "scale(1)",
              boxShadow: hoveredButton === "explore"
                ? "0 12px 28px rgba(255, 255, 255, 0.3)"
                : "0 4px 12px rgba(255, 255, 255, 0.2)",
              backgroundColor: hoveredButton === "explore" ? "#f3d27a" : "white"
            }}
          >
            Explore Products
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
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
        @keyframes fadeInDown {
          from { 
            opacity: 0;
            transform: translateY(-15px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(15px);
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