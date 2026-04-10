import { useState } from "react";

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
      console.log(data.product);
    } else {
      alert(data.message || "Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 p-6">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Add Product</button>
    </form>
  );
}