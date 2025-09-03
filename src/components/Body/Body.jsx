import React, { useState, useRef, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./Body.css";

const Body = ({ recentChats, setRecentChats, currentChat }) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

  const handleSend = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;

    
    setRecentChats((prev) => {
      const updated = [trimmedPrompt, ...prev.filter((chat) => chat !== trimmedPrompt)];
      return updated.slice(0, 5);
    });

   
    setMessages((prev) => [...prev, { role: "user", text: trimmedPrompt }]);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmedPrompt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP error! status: ${res.status}`);

      
      setMessages((prev) => [...prev, { role: "ai", text: data.response }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="main">
      {currentChat && (
        <div className="chat-box">
          <h2>Loaded Chat:</h2>
          <p>{currentChat}</p>
        </div>
      )}

      {messages.length === 0 && (
        <div className="main-container">
          <p>
            <span>Hello There!</span>
          </p>
          <h2>Talk to your Own Assistant</h2>
        </div>
      )}

      
      <div className="chat-container">
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

     
      <div className="prompt-area">
        <input
          type="text"
          id="prompt"
          className="text-black"
          placeholder="Ask Something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={loading}
        />
        <button id="btn" onClick={handleSend} disabled={loading}>
          <img src={assets.send} alt="btn" />
        </button>
      </div>

      
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading && <img src={assets.load} alt="loading" />}
    </div>
  );
};

export default Body;

