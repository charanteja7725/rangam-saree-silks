import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})
      .then(res => res.json())
      .then(data => setOrders(data.orders || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} className="mb-4 p-4 border rounded">
            <p><b>Total:</b> ₹{order.totalPrice}</p>
            <p><b>City:</b> {order.city}</p>
            <p><b>Phone:</b> {order.phone}</p>
          </div>
        ))
      )}
    </div>
  );
}