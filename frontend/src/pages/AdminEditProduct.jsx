import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: ""
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const p = data.product;

        setForm({
          name: p.name || "",
          price: p.price || "",
          description: p.description || "",
          category: p.category || "",
          stock: p.stock || ""
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("stock", form.stock);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/products/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Product updated successfully");
      navigate("/admin/products");
    } else {
      alert(data.message || "Failed to update product");
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
            Edit Product
          </h1>
        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-5 rounded-3xl bg-white p-8 shadow-md"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
          />

          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-[#7a1f3d] file:px-4 file:py-2 file:text-white"
          />

          <button
            type="submit"
            className="rounded-xl bg-[#7a1f3d] px-6 py-3 font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}