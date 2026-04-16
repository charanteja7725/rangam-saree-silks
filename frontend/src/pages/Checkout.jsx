import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Checkout() {
  const navigate = useNavigate();
  const [inputFocus, setInputFocus] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

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

        prefill: { contact: form.phone },
        theme: { color: "#7a1f3d" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const inputStyle = (name) => ({
    width: "100%",
    borderRadius: "0.75rem",
    border: inputFocus === name ? "2px solid #7a1f3d" : "2px solid #d6bfa8",
    background: "white",
    padding: "0.75rem",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: inputFocus === name ? "0 4px 16px rgba(122, 31, 61, 0.15)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
    color: "#2f1b1b"
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fffaf5 0%, #f5f0eb 100%)",
      color: "#2f1b1b",
      fontFamily: "'Inter', sans-serif"
    }}>
      <Navbar />

      <div style={{
        margin: "0 auto",
        maxWidth: "72rem",
        padding: "2.5rem 1.5rem"
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          marginBottom: "2rem",
          fontSize: "2.25rem",
          fontWeight: "bold",
          color: "#7a1f3d",
          letterSpacing: "0.02em",
          animation: "fadeIn 0.8s ease-in"
        }}>
          Checkout
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem"
        }}>
          {/* Shipping */}
          <div style={{
            borderRadius: "1.5rem",
            background: "white",
            padding: "2rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            animation: "slideInLeft 0.8s ease-out"
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              marginBottom: "1.5rem",
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#7a1f3d",
              letterSpacing: "0.02em"
            }}>
              Shipping Details
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                onFocus={() => setInputFocus("address")}
                onBlur={() => setInputFocus(null)}
                style={inputStyle("address")}
              />
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                onFocus={() => setInputFocus("city")}
                onBlur={() => setInputFocus(null)}
                style={inputStyle("city")}
              />
              <input
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                onFocus={() => setInputFocus("pincode")}
                onBlur={() => setInputFocus(null)}
                style={inputStyle("pincode")}
              />
              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                onFocus={() => setInputFocus("phone")}
                onBlur={() => setInputFocus(null)}
                style={inputStyle("phone")}
              />
            </div>
          </div>

          {/* Summary */}
          <div style={{
            height: "fit-content",
            borderRadius: "1.5rem",
            background: "white",
            padding: "2rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            position: "sticky",
            top: "2rem",
            animation: "slideInRight 0.8s ease-out"
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              marginBottom: "1.5rem",
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#7a1f3d",
              letterSpacing: "0.02em"
            }}>
              Order Summary
            </h2>

            <div style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
              color: "#5c4033",
              fontSize: "0.95rem"
            }}>
              <span>Total Items</span>
              <span style={{ fontWeight: "600" }}>{cart.length}</span>
            </div>

            <div style={{
              marginBottom: "1.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "2px solid #e0d5c7",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#4b2e2e"
            }}>
              <span>Total Price</span>
              <span style={{
                color: "#b88917",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem"
              }}>₹{totalPrice}</span>
            </div>

            <button
              onClick={loadPayment}
              onMouseEnter={() => setHoveredButton("pay")}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                width: "100%",
                borderRadius: "0.75rem",
                background: hoveredButton === "pay" ? "linear-gradient(135deg, #9d2651 0%, #7a1f3d 100%)" : "linear-gradient(135deg, #7a1f3d 0%, #9d2651 100%)",
                padding: "0.875rem",
                color: "white",
                fontWeight: "600",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: hoveredButton === "pay" ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hoveredButton === "pay"
                  ? "0 12px 32px rgba(122, 31, 61, 0.4)"
                  : "0 6px 16px rgba(122, 31, 61, 0.2)",
                letterSpacing: "0.05em",
                textTransform: "uppercase"
              }}
            >
              Pay with Razorpay
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}