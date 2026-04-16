import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful");
      window.location.href = "/login";
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f1b1b]">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#b88917]">
            Join Us
          </p>

          <h1 className="mb-6 text-4xl font-bold text-[#7a1f3d]">
            Create Account
          </h1>

          <div className="space-y-4">
            <input
              placeholder="Name"
              className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Password"
              type="password"
              className="w-full rounded-xl border border-[#e7d7c9] px-4 py-3 outline-none transition focus:border-[#b88917] focus:ring-2 focus:ring-[#f3d27a]"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-[#7a1f3d] px-4 py-3 font-medium text-white shadow-md transition hover:bg-[#5f1730] hover:shadow-lg"
            >
              Register
            </button>
          </div>

          <p className="mt-6 text-sm text-[#5c4033]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#b88917] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}