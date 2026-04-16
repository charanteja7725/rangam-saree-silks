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

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const loadPayment = async () => {
    try {
      if (!form.address || !form.city || !form.pincode || !form.phone) {
        alert("Please fill all fields");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const orderRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalPrice })
        }
      );

      const order = await orderRes.json();

      if (!orderRes.ok || !order.id) {
        alert(order.message || "Failed to create Razorpay order");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Rangam Saree Silks",
        description: "Order Payment",
        order_id: order.id,
        handler: async function () {
          try {
            const token = localStorage.getItem("token");

            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/api/orders`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  items: cart,
                  totalAmount: totalPrice,
                  address: form.address,
                  city: form.city,
                  pincode: form.pincode,
                  phone: form.phone
                })
              }
            );

            const data = await res.json();

            if (data.success) {
              alert("Payment successful!");
              localStorage.removeItem("cart");
              navigate("/orders");
            } else {
              alert(data.message || "Order save failed");
            }
          } catch (error) {
            console.error(error);
            alert("Payment succeeded, but saving order failed");
          }
        },
        prefill: {
          contact: form.phone
        },
        theme: {
          color: "#7a1f3d"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#b88917]">
            Secure Checkout
          </p>
          <h1 className="text-5xl font-bold text-[#7a1f3d] md:text-6xl">
            Checkout
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-md">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#b88917]">
              Shipping
            </p>

            <h2 className="mb-6 text-3xl font-bold text-[#7a1f3d]">
              Shipping Details
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Address"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="w-full rounded-xl border border-[#e7d7c9] bg-white px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
              />

              <input
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                className="w-full rounded-xl border border-[#e7d7c9] bg-white px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
              />

              <input
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) =>
                  setForm({ ...form, pincode: e.target.value })
                }
                className="w-full rounded-xl border border-[#e7d7c9] bg-white px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
              />

              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="w-full rounded-xl border border-[#e7d7c9] bg-white px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
              />
            </div>
          </div>

          <div className="h-fit rounded-3xl bg-white p-8 shadow-md">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#b88917]">
              Summary
            </p>

            <h2 className="mb-6 text-3xl font-bold text-[#7a1f3d]">
              Order Summary
            </h2>

            <div className="mb-4 flex items-center justify-between text-[#5c4033]">
              <span>Total Items</span>
              <span className="font-medium">{totalItems}</span>
            </div>

            <div className="mb-8 flex items-center justify-between border-t border-[#eee2d7] pt-4 text-xl font-bold">
              <span>Total Price</span>
              <span className="text-[#b88917]">₹{totalPrice}</span>
            </div>

            <button
              onClick={loadPayment}
              className="w-full rounded-xl bg-[#7a1f3d] px-4 py-3 font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
            >
              Pay with Razorpay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}