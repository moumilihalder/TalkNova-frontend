import React, { useState } from "react";

const Signup = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateStrongPassword = (length = 12) => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  };

  const handleSuggestPassword = () => {
    const strongPassword = generateStrongPassword();
    setFormData({ ...formData, password: strongPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed!");
        return;
      }

      alert(data.message || "Signup successful!");

      switchToLogin();
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(50,69,91)]">
      <div className="bg-[rgb(30,40,60)] p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-[rgb(50,69,91)] text-white border-gray-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-[rgb(50,69,91)] text-white border-gray-500"
            required
          />

          <div className="relative flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-lg bg-[rgb(50,69,91)] text-white border-gray-500"
              required
            />

            <button
              type="button"
              className="bg-gray-700 px-3 py-1 rounded-lg text-white hover:bg-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            <button
              type="button"
              className="bg-purple-500 px-3 py-1 rounded-lg text-white hover:bg-purple-600"
              onClick={handleSuggestPassword}
            >
              Suggest
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-purple-400 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;