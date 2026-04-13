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
import AdminEditProduct from "../pages/AdminEditProduct"; // ✅ important

export default function AppRoutes() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/checkout"
          element={isLoggedIn ? <Checkout /> : <Login />}
        />
        <Route
          path="/orders"
          element={isLoggedIn ? <OrderHistory /> : <Login />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}