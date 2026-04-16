import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [hoveredButton, setHoveredButton] = useState(null);
  const [inputFocus, setInputFocus] = useState(null);

  const handleLogin = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");
      window.location.href = "/";
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fffaf5 0%, #f5f0eb 100%)",
      fontFamily: "'Inter', sans-serif"
    }}>
      <Navbar />

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 100px)",
        padding: "2rem"
      }}>
        <div style={{
          background: "white",
          borderRadius: "2rem",
          padding: "3rem",
          maxWidth: "450px",
          width: "100%",
          boxShadow: "0 20px 60px rgba(122, 31, 61, 0.15)",
          transition: "all 0.3s ease",
          animation: "slideInUp 0.8s ease-out"
        }}>
          <h1 style={{
            marginBottom: "0.5rem",
            fontSize: "2.25rem",
            fontWeight: "bold",
            color: "#7a1f3d",
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.02em",
            textAlign: "center"
          }}>
            Welcome Back
          </h1>

          <p style={{
            marginBottom: "2rem",
            fontSize: "0.95rem",
            color: "#5c4033",
            textAlign: "center",
            letterSpacing: "0.05em"
          }}>
            Sign in to your account
          </p>

          <div style={{
            marginBottom: "1.5rem"
          }}>
            <label style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#7a1f3d",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              Email Address
            </label>
            <input
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                width: "100%",
                borderRadius: "0.75rem",
                border: inputFocus === "email" ? "2px solid #7a1f3d" : "2px solid #d6bfa8",
                background: "white",
                padding: "0.875rem",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: inputFocus === "email" ? "0 4px 16px rgba(122, 31, 61, 0.15)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
                color: "#2f1b1b"
              }}
              onFocus={() => setInputFocus("email")}
              onBlur={() => setInputFocus(null)}
            />
          </div>

          <div style={{
            marginBottom: "2rem"
          }}>
            <label style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#7a1f3d",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              Password
            </label>
            <input
              placeholder="••••••••"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{
                width: "100%",
                borderRadius: "0.75rem",
                border: inputFocus === "password" ? "2px solid #7a1f3d" : "2px solid #d6bfa8",
                background: "white",
                padding: "0.875rem",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: inputFocus === "password" ? "0 4px 16px rgba(122, 31, 61, 0.15)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
                color: "#2f1b1b"
              }}
              onFocus={() => setInputFocus("password")}
              onBlur={() => setInputFocus(null)}
            />
          </div>

          <button
            onClick={handleLogin}
            onMouseEnter={() => setHoveredButton("login")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              width: "100%",
              borderRadius: "0.75rem",
              background: hoveredButton === "login" ? "linear-gradient(135deg, #9d2651 0%, #7a1f3d 100%)" : "linear-gradient(135deg, #7a1f3d 0%, #9d2651 100%)",
              padding: "0.875rem",
              color: "white",
              fontWeight: "600",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: hoveredButton === "login" ? "translateY(-2px)" : "translateY(0)",
              boxShadow: hoveredButton === "login"
                ? "0 12px 32px rgba(122, 31, 61, 0.4)"
                : "0 6px 16px rgba(122, 31, 61, 0.2)",
              letterSpacing: "0.05em",
              textTransform: "uppercase"
            }}
          >
            Login
          </button>

          <p style={{
            marginTop: "1.5rem",
            textAlign: "center",
            color: "#5c4033",
            fontSize: "0.95rem"
          }}>
            Don't have an account?{" "}
            <Link to="/register" style={{
              color: "#7a1f3d",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.3s ease",
              borderBottom: "2px solid transparent",
              paddingBottom: "2px"
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = "#b88917";
                e.currentTarget.style.color = "#b88917";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = "transparent";
                e.currentTarget.style.color = "#7a1f3d";
              }}
            >
              Register here
            </Link>
          </p>
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