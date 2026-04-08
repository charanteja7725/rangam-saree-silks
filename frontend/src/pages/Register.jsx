import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    console.log(data);
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-bold">Register</h1>
      <input className="w-full border p-2" name="name" placeholder="Name" onChange={handleChange} />
      <input className="w-full border p-2" name="email" placeholder="Email" onChange={handleChange} />
      <input className="w-full border p-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button className="bg-black px-4 py-2 text-white">Register</button>
    </form>
  );
}