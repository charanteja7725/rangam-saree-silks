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
      console.log("Razorpay order:", order);

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
        handler: async function (response) {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                items: cart,
                totalPrice,
                ...form,
                paymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id
              })
            });

            const data = await res.json();
            console.log("Order save response:", data);
             if (data.success) {
              alert("Payment successful!");
              localStorage.removeItem("cart");
              navigate("/orders"); // 👈 paste here
              }
              else {
              alert(data.message || "Payment done, but order save failed");
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

            <div className="mb-4 flex items-center justify-between">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="mb-6 flex items-center justify-between text-xl font-bold">
              <span>Total Price</span>
              <span className="text-[#b88917]">₹{totalPrice}</span>
            </div>

            <button
              onClick={loadPayment}
              className="w-full rounded bg-[#7a1f3d] px-4 py-3 text-white transition hover:bg-[#5f1730]"
            >
              Pay with Razorpay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}