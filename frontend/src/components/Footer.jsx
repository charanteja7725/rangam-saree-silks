export default function Footer() {
  const footerStyle = {
    marginTop: "2.5rem",
    borderTop: "2px solid #e0d5c7",
    background: "linear-gradient(135deg, #2f1b1b 0%, #3d2725 100%)",
    padding: "2.5rem 1rem",
    transition: "all 0.3s ease"
  };

  const containerStyle = {
    maxWidth: "80rem",
    margin: "0 auto",
    fontSize: "0.875rem",
    color: "#b8a589",
    textAlign: "center",
    letterSpacing: "0.05em"
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={{
          margin: 0,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.1rem",
          fontWeight: "500",
          color: "#f3d27a",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          transition: "all 0.3s ease",
          cursor: "default"
        }}>
          © 2026 Rangam Saree Silks. All rights reserved.
        </p>
        <p style={{
          marginTop: "0.75rem",
          fontSize: "0.8rem",
          color: "#8b7355",
          letterSpacing: "0.05em"
        }}>
          Crafted with elegance • Premium silk sarees for every celebration
        </p>
      </div>
    </footer>
  );
}