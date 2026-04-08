import { useState } from "react";

export default function Checkout() {
  const [form, setForm] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: ""
  });

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const placeOrder = async () => {

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

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
    }
  };

  return (
    <div>
      <h1>Checkout</h1>

      <input placeholder="Address"
        onChange={(e)=>setForm({...form,address:e.target.value})} />

      <input placeholder="City"
        onChange={(e)=>setForm({...form,city:e.target.value})} />

      <input placeholder="Pincode"
        onChange={(e)=>setForm({...form,pincode:e.target.value})} />

      <input placeholder="Phone"
        onChange={(e)=>setForm({...form,phone:e.target.value})} />

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}