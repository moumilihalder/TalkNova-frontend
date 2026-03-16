import React, { useState, useRef, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./Body.css";

const Body = ({ recentChats, setRecentChats, currentChat, disabled }) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chatEndRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (disabled) return;

    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to send messages.");
      return;
    }

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: trimmedPrompt }]);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: trimmedPrompt }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message || data.error || "Backend Error");

      const aiReply = data.answer || "No response from AI.";

      // Add AI message
      setMessages((prev) => [...prev, { role: "ai", text: aiReply }]);

      // Update recent chats (only latest 5)
      setRecentChats((prev) => {
        const updated = [
          { userMessage: trimmedPrompt, aiReply },
          ...prev,
        ];
        return updated.slice(0, 5);
      });

      setPrompt(""); // reset input after successful send
    } catch (err) {
      setError(err.message || "Failed to get AI reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      {messages.length === 0 && (
        <div className="main-container">
          <p>
            <span>Hello There!</span>
          </p>
          <h2>Talk to your Own Assistant</h2>
        </div>
      )}

      {/* Chat Messages */}
      <div className={`chat-container ${disabled ? "disabled" : ""}`}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "user-chat-box" : "ai-chat-box"}
          >
            <div className="chat-message">
              <img
                src={msg.role === "user" ? assets.user : assets.ai}
                className="chat-pic"
                alt={msg.role}
              />
              <p className="chat-text">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Prompt Area */}
      <div className="prompt-area">
        <input
          type="text"
          placeholder={disabled ? "Login to start chatting..." : "Ask Something..."}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={disabled || loading}
        />
        <button onClick={handleSend} disabled={disabled || loading}>
          <img src={assets.send} alt="send" />
        </button>
      </div>

      {disabled && (
        <p style={{ color: "gray", textAlign: "center", marginTop: "10px" }}>
          Please login/signup to enable chat.
        </p>
      )}

      {error && <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>}
      {loading && <img src={assets.load} alt="loading" style={{ display: "block", margin: "10px auto" }} />}
    </div>
  );
};

export default Body;