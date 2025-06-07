import { useState } from "react";
import axios from "axios";
import { Mail, User, Lock } from "lucide-react"; // Lucide icons
import { useNavigate } from "react-router";


const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [strength, setStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    checkPasswordStrength(value);
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[\W]/.test(password)) score++;
    setStrength(score);
  };

  const getStrengthColor = (index) => {
    if (index < strength) {
      if (strength <= 1) return "bg-red-500";
      else if (strength === 2) return "bg-yellow-500";
      else return "bg-green-500";
    } else {
      return "bg-gray-700";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form,
        { withCredentials: true }
      );
      console.log("Signup Success:", res.data);
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back 👋</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="input input-bordered flex items-center gap-3 bg-[#1e293b] text-white w-full">
            <User className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="grow bg-transparent focus:outline-none"
            />
          </label>

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
            <Lock className="text-gray-400 w- h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="grow bg-transparent focus:outline-none"
            />
          </label>

          {/* Password Strength Bar */}
          <div className="flex gap-2 mt-1 ml-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-2 flex-1 rounded ${getStrengthColor(i)}`}></div>
            ))}
          </div>

          <button className="btn bg-[#1d4ed8] text-white hover:bg-[#2563eb] w-full mt-4">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6 text-gray-300">
          Do you have an account?
          <a href="/login" className="ml-1 text-blue-400 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
