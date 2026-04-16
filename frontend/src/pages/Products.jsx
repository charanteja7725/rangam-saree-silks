import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.log(err));
  }, []);

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(allCategories)];
  }, [products]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return Number(a.price) - Number(b.price);
    if (sortOrder === "highToLow") return Number(b.price) - Number(a.price);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#b88917]">
            Premium Collection
          </p>
          <h1 className="text-5xl font-bold text-[#7a1f3d] md:text-6xl">
            Our Sarees
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#5c4033]">
            Explore elegant sarees designed for weddings, celebrations, and
            timeless everyday grace.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 rounded-3xl bg-white p-6 shadow-md md:grid-cols-3">
          <input
            type="text"
            placeholder="Search sarees by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-[#e7d7c9] bg-white px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-xl border border-[#e7d7c9] bg-white px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full rounded-xl border border-[#e7d7c9] bg-white px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
          >
            <option value="default">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-md">
            <p className="text-lg text-[#5c4033]">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((p) => (
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

                  <p className="mb-4 text-sm leading-6 text-[#6b4f45]">
                    Elegant craftsmanship with a graceful finish for special
                    occasions.
                  </p>

                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xl font-bold text-[#b88917]">
                      ₹{p.price}
                    </p>
                  </div>

                  <Link
                    to={`/product/${p._id}`}
                    className="block rounded-xl bg-[#7a1f3d] px-4 py-3 text-center font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}