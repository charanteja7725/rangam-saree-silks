import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email:"", password:"" });

  const handleLogin = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if(data.token){
      localStorage.setItem("token", data.token);
      alert("Login success");
    }
  };

  return (
    <div className="p-6">
      <h1>Login</h1>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
