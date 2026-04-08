import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {products.map(p => (
        <div key={p._id} className="border p-4">
          <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />
          <h2 className="font-bold">{p.name}</h2>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}