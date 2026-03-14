import React, { useState } from "react";

const Signup = ({ switchToLogin }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await res.json();

        alert(data.message || "Signup successful");

    };

    return (

        <div>

            <h2>Signup</h2>

            <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSignup}>
                Signup
            </button>

            <p>
                Already have an account?
                <button onClick={switchToLogin}>Login</button>
            </p>

        </div>
    );
};

export default Signup;