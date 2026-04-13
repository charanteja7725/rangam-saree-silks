import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-[#7a1f3d] text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold">
        <Link to="/">RANGAM</Link>
      </h1>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        {token ? (
          <>
            <Link to="/orders">My Orders</Link>

            {/* ✅ ADMIN LINKS */}
            <Link to="/admin/add-product">Add Product</Link>
            <Link to="/admin/products">Manage Products</Link>

            <button
              onClick={handleLogout}
              className="bg-white text-[#7a1f3d] px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}