import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-[#fffaf5] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold tracking-wide text-[#7a1f3d]">
          RANGAM
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-[#4b2e2e]">
          <Link to="/" className="hover:text-[#b88917]">Home</Link>
          <Link to="/products" className="hover:text-[#b88917]">Products</Link>
          <Link to="/cart" className="hover:text-[#b88917]">Cart</Link>
          <Link to="/login" className="hover:text-[#b88917]">Login</Link>
        </div>
      </div>
    </nav>
  );
}