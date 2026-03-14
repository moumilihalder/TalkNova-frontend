import React, { useState } from "react";

const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, // ✅ correct endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.reload();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(50,69,91)]">
      <div className="bg-[rgb(30,40,60)] p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-[rgb(50,69,91)] text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center gap-2 mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[rgb(50,69,91)] text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={!email || !password}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          Login
        </button>

        <p className="text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <button
            className="text-blue-400 hover:underline"
            onClick={switchToSignup}
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;