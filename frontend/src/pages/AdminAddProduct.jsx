import { useState } from "react";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      })
    });

    const data = await res.json();
    alert(data.message || "Product added");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-bold">Admin Add Product</h1>
      <input className="w-full border p-2" name="name" placeholder="Name" onChange={handleChange} />
      <input className="w-full border p-2" name="price" placeholder="Price" onChange={handleChange} />
      <input className="w-full border p-2" name="description" placeholder="Description" onChange={handleChange} />
      <input className="w-full border p-2" name="image" placeholder="Image URL" onChange={handleChange} />
      <input className="w-full border p-2" name="category" placeholder="Category" onChange={handleChange} />
      <input className="w-full border p-2" name="stock" placeholder="Stock" onChange={handleChange} />
      <button className="bg-black px-4 py-2 text-white">Add Product</button>
    </form>
  );
}