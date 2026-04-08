import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, [id]);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    navigate("/cart");
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
      <img src={product.image} alt={product.name} className="w-full rounded" />

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-xl text-gray-700">₹{product.price}</p>
        <p className="mt-4">{product.description}</p>
        <p className="mt-2">Category: {product.category}</p>
        <p className="mt-2">Stock: {product.stock}</p>

        <button
          onClick={addToCart}
          className="mt-6 rounded bg-black px-5 py-3 text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}