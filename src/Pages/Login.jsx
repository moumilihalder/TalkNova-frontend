import React, { useState } from "react";

const Login = ({ switchToSignup }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await res.json();

        if (data.token) {

            localStorage.setItem("token", data.token);

            console.log("Login successful");

            
            window.location.href = "/";

        } else {

            alert(data.message);

        }

    };

    return (

        <div>

            <h2>Login</h2>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>
            <p>
                Don't have an account?
                <button onClick={switchToSignup}>Signup</button>
            </p>

        </div>
    );
};

export default Login;