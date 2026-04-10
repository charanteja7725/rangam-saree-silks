import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: ""
  });

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const placeOrder = async () => {
    if (!form.address || !form.city || !form.pincode || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        totalPrice,
        ...form
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      navigate("/products");
    } else {
      alert(data.message || "Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="brand-font mb-8 text-4xl font-bold text-[#7a1f3d]">
          Checkout
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-md">
            <h2 className="brand-font mb-6 text-3xl font-bold text-[#7a1f3d]">
              Shipping Details
            </h2>

            <div className="space-y-4">
              <input
                className="w-full rounded-xl border border-[#e7d8c7] px-4 py-3 outline-none focus:border-[#b88917]"
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <input
                className="w-full rounded-xl border border-[#e7d8c7] px-4 py-3 outline-none focus:border-[#b88917]"
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />

              <input
                className="w-full rounded-xl border border-[#e7d8c7] px-4 py-3 outline-none focus:border-[#b88917]"
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              />

              <input
                className="w-full rounded-xl border border-[#e7d8c7] px-4 py-3 outline-none focus:border-[#b88917]"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="h-fit rounded-2xl bg-white p-8 shadow-md">
            <h2 className="brand-font mb-6 text-3xl font-bold text-[#7a1f3d]">
              Order Summary
            </h2>

            <div className="mb-4 flex items-center justify-between text-[#5c4033]">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="mb-6 flex items-center justify-between text-xl font-bold">
              <span>Total Price</span>
              <span className="text-[#b88917]">₹{totalPrice}</span>
            </div>

            <button
              onClick={placeOrder}
              className="w-full rounded bg-[#7a1f3d] px-4 py-3 text-white transition hover:bg-[#5f1730]"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}