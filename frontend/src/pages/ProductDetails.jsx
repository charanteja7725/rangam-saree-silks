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
      .then((data) => setProduct(data.product))
      .catch((err) => console.log(err));
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

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="h-[520px] w-full object-cover"
            />
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#b88917]">
              Premium Collection
            </p>

            <h1 className="mb-4 text-4xl font-bold text-[#7a1f3d] md:text-5xl">
              {product.name}
            </h1>

            <p className="mb-6 text-3xl font-bold text-[#b88917]">
              ₹{product.price}
            </p>

            <p className="border-l-4 border-[#b88917] pl-4 leading-8 text-[#5c4033]">
              {product.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#fffaf5] p-4">
                <p className="text-sm uppercase tracking-wide text-[#7a1f3d]">
                  Category
                </p>
                <p className="mt-1 font-semibold text-[#2f1b1b]">
                  {product.category}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffaf5] p-4">
                <p className="text-sm uppercase tracking-wide text-[#7a1f3d]">
                  Stock
                </p>
                <p className="mt-1 font-semibold text-[#2f1b1b]">
                  {product.stock}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={addToCart}
                className="rounded-xl bg-[#7a1f3d] px-6 py-3 font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate("/products")}
                className="rounded-xl border border-[#b88917] px-6 py-3 font-medium text-[#b88917] transition hover:bg-[#b88917] hover:text-white"
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}