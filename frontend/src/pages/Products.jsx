import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold text-[#7a1f3d]">Our Sarees</h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="mb-2 text-xl font-semibold text-[#4b2e2e]">{p.name}</h2>
                <p className="mb-4 text-lg font-bold text-[#b88917]">₹{p.price}</p>

                <Link
                  to={`/product/${p._id}`}
                  className="inline-block rounded bg-[#7a1f3d] px-4 py-2 text-white transition hover:bg-[#5f1730]"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}