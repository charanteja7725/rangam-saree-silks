import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
   fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, [id]);

 const addToCart = () => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  existingCart.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(existingCart));
  navigate("/cart");
};

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
        <Navbar />
        <p className="px-6 py-10 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-md">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#b88917]">
            Premium Collection
          </p>

          <h1 className="brand-font text-5xl font-bold text-[#7a1f3d]">
            {product.name}
          </h1>

          <p className="mt-4 text-3xl font-bold text-[#b88917]">₹{product.price}</p>

          <p className="mt-6 leading-7 text-[#5c4033]">
            {product.description}
          </p>

          <div className="mt-6 space-y-2 text-[#4b2e2e]">
            <p>
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p>
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>
          </div>

          <button
            onClick={addToCart}
            className="mt-8 rounded bg-[#7a1f3d] px-6 py-3 text-white transition hover:bg-[#5f1730]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}