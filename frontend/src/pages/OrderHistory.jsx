import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/my`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#b88917]">
            Your Purchases
          </p>
          <h1 className="text-5xl font-bold text-[#7a1f3d] md:text-6xl">
            My Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-md">
            <p className="mb-6 text-lg text-[#5c4033]">No orders yet</p>
            <Link
              to="/products"
              className="inline-block rounded-xl bg-[#7a1f3d] px-6 py-3 font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white p-6 shadow-md transition duration-300 hover:shadow-2xl"
              >
                <div className="mb-6 flex flex-col gap-4 border-b border-[#eee2d7] pb-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#b88917]">
                      Order #{i + 1}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#7a1f3d]">
                      ₹{order.totalAmount}
                    </h2>
                  </div>

                  <div className="grid gap-2 text-sm text-[#5c4033] md:text-right">
                    <p>
                      <span className="font-semibold text-[#2f1b1b]">City:</span>{" "}
                      {order.city}
                    </p>
                    <p>
                      <span className="font-semibold text-[#2f1b1b]">Phone:</span>{" "}
                      {order.phone}
                    </p>
                    <p>
                      <span className="font-semibold text-[#2f1b1b]">Status:</span>{" "}
                      <span className="font-medium text-[#b88917]">
                        {order.status || "Processing"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 rounded-2xl bg-[#fffaf5] p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#4b2e2e]">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#5c4033]">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold text-[#b88917]">
                        ₹{Number(item.price) * Number(item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}