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

  // 🔹 Fetch existing product
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

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Update product
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
    <div className="min-h-screen bg-[#fffaf5]">
      <Navbar />

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="mb-6 text-3xl font-bold text-[#7a1f3d]">
          Edit Product
        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-4 rounded-2xl bg-white p-6 shadow-md"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full rounded border p-3"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full rounded border p-3"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full rounded border p-3"
          />

          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full rounded border p-3"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded border p-3"
            rows="4"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full rounded border p-3"
          />

          <button
            type="submit"
            className="rounded bg-[#7a1f3d] px-6 py-3 text-white hover:bg-[#5f1730]"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}