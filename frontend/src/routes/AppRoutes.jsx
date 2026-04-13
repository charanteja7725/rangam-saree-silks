import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
import OrderHistory from "../pages/OrderHistory";

export default function AppRoutes() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Routes */}
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
      </Routes>
    </Router>
  );
}