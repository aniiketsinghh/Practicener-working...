import { useState } from "react";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        { withCredentials: true }
      );
      console.log("Login Success:", res.data);
       window.location.reload(); // refresh app to update isAuthenticated
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="input input-bordered flex items-center gap-3 bg-[#1e293b] text-white w-full">
            <Mail className="text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="grow bg-transparent focus:outline-none"
            />
          </label>

          <label className="input input-bordered flex items-center gap-3 bg-[#1e293b] text-white w-full">
            <Lock className="text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="grow bg-transparent focus:outline-none"
            />
          </label>

          <button className="btn bg-[#1d4ed8] text-white hover:bg-[#2563eb] w-full mt-4">
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-gray-300">
          Wanna sign up?
          <a href="/signup" className="ml-1 text-blue-300 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
