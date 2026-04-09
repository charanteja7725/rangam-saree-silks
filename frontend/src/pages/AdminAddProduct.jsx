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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });
    formData.append("image", image);

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    alert("Product added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
      <input name="price" placeholder="Price" onChange={(e)=>setForm({...form,price:e.target.value})} />
      <input name="description" placeholder="Description" onChange={(e)=>setForm({...form,description:e.target.value})} />
      <input name="category" placeholder="Category" onChange={(e)=>setForm({...form,category:e.target.value})} />
      <input name="stock" placeholder="Stock" onChange={(e)=>setForm({...form,stock:e.target.value})} />

      {/* IMAGE INPUT */}
      <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

      <button>Add Product</button>
    </form>
  );
}