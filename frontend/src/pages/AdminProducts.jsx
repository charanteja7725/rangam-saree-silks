import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      fetchProducts();
    } else {
      alert(data.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#b88917]">
            Admin Panel
          </p>
          <h1 className="text-5xl font-bold text-[#7a1f3d] md:text-6xl">
            Admin Products
          </h1>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-md">
            <p className="text-lg text-[#5c4033]">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-80 w-full object-cover"
                />

                <div className="p-5">
                  <p className="mb-2 text-sm uppercase tracking-wide text-[#b88917]">
                    {p.category || "Premium Saree"}
                  </p>

                  <h2 className="mb-2 text-2xl font-semibold text-[#4b2e2e]">
                    {p.name}
                  </h2>

                  <p className="mb-2 text-xl font-bold text-[#b88917]">
                    ₹{p.price}
                  </p>

                  <p className="mb-1 text-sm text-[#5c4033]">
                    <span className="font-semibold">Category:</span> {p.category}
                  </p>

                  <p className="mb-5 text-sm text-[#5c4033]">
                    <span className="font-semibold">Stock:</span> {p.stock}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      to={`/admin/edit-product/${p._id}`}
                      className="flex-1 rounded-xl bg-[#7a1f3d] px-4 py-3 text-center font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="flex-1 rounded-xl border border-red-500 px-4 py-3 font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}