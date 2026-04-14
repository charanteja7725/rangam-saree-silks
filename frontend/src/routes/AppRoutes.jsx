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

export default function AppRoutes() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!token;
  const isAdmin = user?.isAdmin;

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* User Protected */}
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

        {/* ✅ Admin Protected */}
        <Route
          path="/admin/add-product"
          element={isAdmin ? <AdminAddProduct /> : <Login />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}