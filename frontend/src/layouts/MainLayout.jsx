import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <Navbar />
      <main style={{
        margin: "0 auto",
        maxWidth: "80rem",
        padding: "1.5rem",
        flex: 1
      }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}