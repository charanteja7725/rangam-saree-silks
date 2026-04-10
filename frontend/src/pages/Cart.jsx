import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = savedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const removeAll = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="brand-font mb-8 text-4xl font-bold text-[#7a1f3d]">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-md">
            <p className="text-lg text-[#5c4033]">Your cart is empty</p>
            <Link
              to="/products"
              className="mt-4 inline-block rounded bg-[#7a1f3d] px-5 py-3 text-white transition hover:bg-[#5f1730]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-5 md:col-span-2">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md transition hover:shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="brand-font text-2xl font-semibold text-[#4b2e2e]">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-medium text-[#b88917]">
                      ₹{item.price}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="rounded border border-[#b88917] px-3 py-1 text-[#b88917] hover:bg-[#b88917] hover:text-white"
                      >
                        -
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(index)}
                        className="rounded border border-[#b88917] px-3 py-1 text-[#b88917] hover:bg-[#b88917] hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    className="rounded border border-red-400 px-4 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl bg-white p-6 shadow-md">
              <h2 className="brand-font mb-4 text-3xl font-bold text-[#7a1f3d]">
                Order Summary
              </h2>

              <div className="mb-3 flex items-center justify-between text-[#5c4033]">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="mb-6 flex items-center justify-between text-xl font-bold text-[#4b2e2e]">
                <span>Total</span>
                <span className="text-[#b88917]">₹{totalPrice}</span>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="block rounded bg-[#7a1f3d] px-4 py-3 text-center text-white transition hover:bg-[#5f1730]"
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={removeAll}
                  className="w-full rounded border border-red-400 px-4 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Remove All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}