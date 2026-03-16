import React, { useState, useEffect } from "react";
import './Sidebar.css';

const SideBar = ({ recentChats, setRecentChats, setCurrentChat, disabled, token, logout, user }) => {
  const [extended, setExtended] = useState(false);

  // Fetch recent chats
  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setRecentChats(data);
      })
      .catch(err => console.log(err));
  }, [token, setRecentChats]);

  return (
    <div className="sidebar" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh", padding: "20px 0" }}>
      
      {/* Top Section */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Menu icon */}
        <lord-icon
          className="menu"
          src="https://cdn.lordicon.com/axroojxh.json"
          trigger="hover"
          onClick={() => setExtended(prev => !prev)}
          style={{ marginBottom: "20px", cursor: "pointer" }}
        />

        {/* New Chat + icon */}
        <div
          className={`new-chat ${disabled ? "disabled" : ""}`}
          onClick={() => !disabled && window.location.reload()}
          style={{ marginBottom: "20px", cursor: "pointer" }}
        >
          <p className='plus'>+</p>
          {extended && <p>New Chat</p>}
        </div>

        {/* User profile icon */}
        {token && user && (
          <div
            className="profile"
            style={{ marginBottom: "20px", cursor: "pointer", textAlign: "center" }}
          >
            <lord-icon
              src="https://cdn.lordicon.com/qhviklyi.json" // user/profile icon
              trigger="hover"
            ></lord-icon>
            {extended && (
              <div style={{ color: "Black", marginTop: "5px", fontSize: "0.9rem" }}>
                <p>{user.name}</p>
                <p style={{ fontSize: "0.8rem", color: "Black" }}>{user.email}</p>
              </div>
            )}
          </div>
        )}

        {/* Recent Chats */}
        {extended && recentChats.length > 0 && (
          <div className="recent" style={{ width: "100%" }}>
            <p className="recent-title">Recent</p>
            {recentChats.map(chat => (
              <div
                key={chat._id}
                className={`recent-entry ${disabled ? "disabled" : ""}`}
                onClick={() => !disabled && setCurrentChat(chat)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/motnbmtz.json"
                  trigger="hover"
                ></lord-icon>
                <p>{chat.userMessage.slice(0, 20)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section: Logout */}
      {token && (
        <div
          className="logout-section"
          onClick={() => {
            logout();
            setExtended(false);
            setCurrentChat(null);
          }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
        >
          <lord-icon
            src="https://cdn.lordicon.com/asyunleq.json" // logout icon
            trigger="hover"
          ></lord-icon>
          {extended && <p>Logout</p>}
        </div>
      )}
    </div>
  );
};

export default SideBar;