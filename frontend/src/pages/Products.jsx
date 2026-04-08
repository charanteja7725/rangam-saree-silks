import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
      {products.map((p) => (
        <div key={p._id} className="rounded border p-4 shadow">
          <img src={p.image} alt={p.name} className="h-48 w-full object-cover" />
          <h2 className="mt-2 text-lg font-bold">{p.name}</h2>
          <p className="text-gray-600">₹{p.price}</p>
          <Link
            to={`/product/${p._id}`}
            className="mt-3 inline-block rounded bg-black px-4 py-2 text-white"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}