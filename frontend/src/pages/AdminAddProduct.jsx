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
    <div className="min-h-screen bg-[#fffaf5]">
      <Navbar />

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="mb-6 text-3xl font-bold text-[#7a1f3d]">Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-6 shadow-md"
        >
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded border p-3"
            rows="4"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full rounded border p-3"
            required
          />

          <button
            type="submit"
            className="rounded bg-[#7a1f3d] px-6 py-3 text-white hover:bg-[#5f1730]"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}