import { useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: ""
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("stock", form.stock);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product added successfully");
        setForm({
          name: "",
          price: "",
          description: "",
          category: "",
          stock: ""
        });
        setImage(null);
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#b88917]">
            Admin Panel
          </p>
          <h1 className="text-5xl font-bold text-[#7a1f3d] md:text-6xl">
            Add Product
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl bg-white p-8 shadow-md"
        >
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
            required
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-[#7a1f3d] file:px-4 file:py-2 file:text-white"
            required
          />

          <button
            type="submit"
            className="rounded-xl bg-[#7a1f3d] px-6 py-3 font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}