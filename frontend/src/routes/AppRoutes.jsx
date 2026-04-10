import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import AdminAddProduct from "../pages/AdminAddProduct";
import OrderHistory from "./pages/OrderHistory";


import Checkout from "../pages/Checkout"; 

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/orders" element={<OrderHistory />} />


      </Routes>
    </BrowserRouter>
  );
}