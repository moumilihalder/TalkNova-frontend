import React, { useState, useEffect } from "react";
import SideBar from "./components/Sidebar/SideBar";
import Body from "./components/Body/Body";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [recentChats, setRecentChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // "login", "signup", or null
  const [modal, setModal] = useState(null);

  // Show login modal if no token on app load
  useEffect(() => {
    if (!token) setModal("login");
  }, [token]);


  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setCurrentUser(null);
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setCurrentUser(data); // must return { name, email }
      } catch (err) {
        console.log(err);
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentChat(null);
    setModal("login"); // open login modal after logout
  };

  return (
    <div className="app-container" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SideBar
        recentChats={recentChats}
        setCurrentChat={setCurrentChat}
        setRecentChats={setRecentChats}
        disabled={!token} // disable sidebar if not logged in
        token={token}
        logout={logout} // pass logout to sidebar
        user={currentUser}
      />

      {/* Main Body */}
      <div style={{ flex: 1, position: "relative" }}>
        <Body
          token={token}
          recentChats={recentChats}
          setRecentChats={setRecentChats}
          currentChat={currentChat}
          disabled={!token} // disable chat if not logged in
        />
      </div>

      {/* Login/Signup Modal */}
      {modal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 200,
            backdropFilter: "blur(2px)",
          }}
        >
          {modal === "login" && (
            <Login
              setToken={(newToken) => {
                setToken(newToken);
                setModal(null); // close modal after login
              }}
              closeLogin={() => setModal(null)}
              switchToSignup={() => setModal("signup")}
            />
          )}
          {modal === "signup" && (
            <Signup
              setToken={(newToken) => {
                setToken(newToken);
                setModal(null); // close modal after signup
              }}
              switchToLogin={() => setModal("login")}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;