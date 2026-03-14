import React, { useState } from "react";


const Signup = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Generate strong password
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
    setPassword(strongPassword);
  };

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    alert(data.message || "Signup successful");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(50,69,91)]">
      <div className="bg-[rgb(30,40,60)] p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-[rgb(50,69,91)] text-white border border-gray-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-[rgb(50,69,91)] text-white border border-gray-500"
        />

        {/* Password input with toggle and suggestion */}
        <div className="flex items-center mb-4 gap-2 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[rgb(50,69,91)] text-white border border-gray-500"
          />
          {/* Show/Hide button */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-20 text-gray-300 hover:text-white px-2"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {/* Suggest strong password */}
          <button
            type="button"
            onClick={handleSuggestPassword}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg"
          >
            Suggest
          </button>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg font-semibold transition"
        >
          Signup
        </button>

        <p className="text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <button className="text-purple-400 hover:underline" onClick={switchToLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;