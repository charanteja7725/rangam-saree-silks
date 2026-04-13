import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold text-[#7a1f3d]">
          Admin Products
        </h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((p) => (
              <div
                key={p._id}
                className="overflow-hidden rounded-2xl bg-white shadow-md"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-72 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="mb-2 text-xl font-semibold text-[#4b2e2e]">
                    {p.name}
                  </h2>
                  <p className="mb-2 text-lg font-bold text-[#b88917]">
                    ₹{p.price}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">
                    Category: {p.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    Stock: {p.stock}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}