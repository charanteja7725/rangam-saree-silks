import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      alert("Product deleted successfully");
      fetchProducts(); // refresh list
    } else {
      alert(data.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
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
                  <p className="mb-4 text-sm text-gray-600">
                    Stock: {p.stock}
                  </p>

                  {/* ✅ DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}