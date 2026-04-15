import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
import OrderHistory from "../pages/OrderHistory";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../pages/NotFound";

import AdminAddProduct from "../pages/AdminAddProduct";
import AdminProducts from "../pages/AdminProducts";
import AdminEditProduct from "../pages/AdminEditProduct";
import AdminOrders from "../pages/AdminOrders";
import AdminDashboard from "../pages/AdminDashboard"; // ✅ ADD THIS

export default function AppRoutes() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!token;
  const isAdmin = user?.role === "admin";

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* User */}
        <Route
          path="/checkout"
          element={isLoggedIn ? <Checkout /> : <Login />}
        />
        <Route
          path="/orders"
          element={isLoggedIn ? <OrderHistory /> : <Login />}
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={isAdmin ? <AdminDashboard /> : <Login />}
        />
        <Route
          path="/admin/add-product"
          element={isAdmin ? <AdminAddProduct /> : <Login />}
        />
        <Route
          path="/admin/products"
          element={isAdmin ? <AdminProducts /> : <Login />}
        />
        <Route
          path="/admin/edit-product/:id"
          element={isAdmin ? <AdminEditProduct /> : <Login />}
        />
        <Route
          path="/admin/orders"
          element={isAdmin ? <AdminOrders /> : <Login />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}