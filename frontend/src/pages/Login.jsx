import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form)
});

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <input className="w-full border p-2" name="email" placeholder="Email" onChange={handleChange} />
      <input className="w-full border p-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button className="bg-black px-4 py-2 text-white">Login</button>
    </form>
  );
}