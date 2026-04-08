import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center gap-4 rounded border p-4">
              <img src={item.image} alt={item.name} className="h-24 w-24 object-cover" />
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}