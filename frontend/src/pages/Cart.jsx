import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return savedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1
    }));
  });

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

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#b88917]">
            Your Selection
          </p>
          <h1 className="text-5xl font-bold text-[#7a1f3d] md:text-6xl">
            Shopping Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-md">
            <p className="text-lg text-[#5c4033]">Your cart is empty</p>
            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-[#7a1f3d] px-6 py-3 font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-5 rounded-3xl bg-white p-5 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:flex-row sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 w-full rounded-2xl object-cover sm:w-32"
                  />

                  <div className="flex-1">
                    <p className="mb-1 text-sm uppercase tracking-wide text-[#b88917]">
                      Premium Saree
                    </p>

                    <h3 className="text-2xl font-semibold text-[#4b2e2e]">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-lg font-bold text-[#b88917]">
                      ₹{item.price}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="rounded-xl border border-[#b88917] px-4 py-2 font-medium text-[#b88917] transition hover:bg-[#b88917] hover:text-white"
                      >
                        -
                      </button>

                      <span className="min-w-[32px] text-center text-lg font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(index)}
                        className="rounded-xl border border-[#b88917] px-4 py-2 font-medium text-[#b88917] transition hover:bg-[#b88917] hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    className="rounded-xl border border-red-400 px-5 py-3 font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
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

              <div className="mb-8 flex items-center justify-between border-t border-[#eee2d7] pt-4 text-xl font-bold text-[#4b2e2e]">
                <span>Total</span>
                <span className="text-[#b88917]">₹{totalPrice}</span>
              </div>

              <div className="space-y-4">
                <Link
                  to="/checkout"
                  className="block rounded-xl bg-[#7a1f3d] px-4 py-3 text-center font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={removeAll}
                  className="w-full rounded-xl border border-red-400 px-4 py-3 font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
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