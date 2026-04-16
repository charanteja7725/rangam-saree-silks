import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b] flex flex-col">
      
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}