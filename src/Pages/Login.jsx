import React, { useState } from "react";

const Login = ({ switchToSignup }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed!");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login successful!");

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(50,69,91)]">
      <div className="bg-[rgb(30,40,60)] p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-[rgb(50,69,91)] text-white border-gray-500"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-[rgb(50,69,91)] text-white border-gray-500"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-300 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-300">
          Don’t have an account?{" "}
          <button
            onClick={switchToSignup}
            className="text-purple-400 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;