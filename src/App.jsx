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

  // "login", "signup", or null
  const [modal, setModal] = useState(null);

  // Show login modal if no token on app load
  useEffect(() => {
    if (!token) setModal("login");
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setModal("login"); // force login modal
  };

  return (
    <div className="app-container" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SideBar
        recentChats={recentChats}
        setCurrentChat={setCurrentChat}
        disabled={!token} // pass disabled prop if you want to gray out sidebar
      />

      {/* Main Body */}
      <div style={{ flex: 1, position: "relative" }}>
        {/* Top-right login/logout button */}
        <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 100 }}>
          {!token ? (
            <button onClick={() => setModal("login")}>Login</button>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>

        {/* Body Component */}
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
          }}
        >
          {modal === "login" && (
            <Login
              setToken={(newToken) => {
                setToken(newToken);
                setModal(null); // close modal
              }}
              closeLogin={() => setModal(null)}
              switchToSignup={() => setModal("signup")}
            />
          )}
          {modal === "signup" && (
            <Signup switchToLogin={() => setModal("login")} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;