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
    <div className="min-h-screen bg-[#fffaf5]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold text-[#7a1f3d]">
          Our Sarees
        </h1>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Search sarees by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-[#d6bfa8] bg-white p-3 outline-none focus:border-[#7a1f3d]"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-lg border border-[#d6bfa8] bg-white p-3 outline-none focus:border-[#7a1f3d]"
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
            className="w-full rounded-lg border border-[#d6bfa8] bg-white p-3 outline-none focus:border-[#7a1f3d]"
          >
            <option value="default">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {sortedProducts.length === 0 ? (
            <p className="text-lg text-[#5c4033]">No products found</p>
          ) : (
            sortedProducts.map((p) => (
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
                  <h2 className="mb-2 text-xl font-semibold text-[#4b2e2e]">
                    {p.name}
                  </h2>

                  <p className="mb-1 text-sm text-gray-600">
                    Category: {p.category}
                  </p>

                  <p className="mb-4 text-lg font-bold text-[#b88917]">
                    ₹{p.price}
                  </p>

                  <Link to={`/product/${p._id}`}>View Details</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}