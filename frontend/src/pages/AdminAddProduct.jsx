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
  const [focusedField, setFocusedField] = useState(null);

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

  const inputStyle = (fieldName) => ({
    width: "100%",
    borderRadius: "0.375rem",
    border: focusedField === fieldName ? "2px solid #7a1f3d" : "2px solid #d6bfa8",
    padding: "0.75rem",
    fontSize: "1rem",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: focusedField === fieldName ? "0 4px 16px rgba(122, 31, 61, 0.15)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
    fontFamily: "'Inter', sans-serif",
    color: "#2f1b1b"
  });

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fffaf5"
    }}>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <Navbar />

      <div style={{
        margin: "0 auto",
        maxWidth: "42rem",
        padding: "2.5rem 1.5rem"
      }}>
        <h1 style={{
          marginBottom: "1.5rem",
          fontSize: "1.875rem",
          fontWeight: "bold",
          color: "#7a1f3d",
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "0.02em"
        }}>
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1rem",
            borderRadius: "1rem",
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            animation: "slideInUp 0.6s ease-out backwards"
          }}
        >
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            style={inputStyle("name")}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            onFocus={() => setFocusedField("price")}
            onBlur={() => setFocusedField(null)}
            style={inputStyle("price")}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            onFocus={() => setFocusedField("category")}
            onBlur={() => setFocusedField(null)}
            style={inputStyle("category")}
            required
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            onFocus={() => setFocusedField("stock")}
            onBlur={() => setFocusedField(null)}
            style={inputStyle("stock")}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            onFocus={() => setFocusedField("description")}
            onBlur={() => setFocusedField(null)}
            style={{
              ...inputStyle("description"),
              minHeight: "6rem",
              resize: "vertical"
            }}
            rows="4"
            className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            onFocus={() => setFocusedField("image")}
            onBlur={() => setFocusedField(null)}
            style={inputStyle("image")}
            required
          />

          <button
            type="submit"
            style={{
              borderRadius: "0.375rem",
              backgroundColor: "#7a1f3d",
              padding: "0.75rem 1.5rem",
              color: "#ffffff",
              border: "none",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              marginTop: "0.5rem"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#5f1730";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 20px rgba(122, 31, 61, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#7a1f3d";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}