import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

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

  return (
    <nav className="bg-[#7a1f3d] text-white px-8 py-4 flex justify-between items-center shadow-md">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide">
        <Link to="/">RANGAM</Link>
      </h1>

      {/* Links */}
      <div className="flex items-center gap-8 text-sm font-medium">
        <Link to="/" className="hover:text-[#f3d27a] transition">Home</Link>
        <Link to="/products" className="hover:text-[#f3d27a] transition">Products</Link>
        <Link to="/cart" className="hover:text-[#f3d27a] transition">Cart</Link>

        {token ? (
          <>
            <Link to="/orders" className="hover:text-[#f3d27a] transition">
              My Orders
            </Link>

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <Link to="/admin/dashboard" className="hover:text-[#f3d27a] transition">
                  Dashboard
                </Link>
                <Link to="/admin/products" className="hover:text-[#f3d27a] transition">
                  Products
                </Link>
                <Link to="/admin/orders" className="hover:text-[#f3d27a] transition">
                  Orders
                </Link>
              </>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-white text-[#7a1f3d] px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-[#f3d27a] transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-[#f3d27a] transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}