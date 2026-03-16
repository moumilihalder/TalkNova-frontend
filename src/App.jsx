import React, { useState } from "react";
import SideBar from "./components/Sidebar/SideBar.jsx";
import Body from "./components/Body/Body.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import "./App.css";

const App = () => {

  const token = localStorage.getItem("token");

  const [recentChats, setRecentChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  
  if (!token) {
    return (
      <div>
        {showSignup ? (
          <Signup switchToLogin={() => setShowSignup(false)} />
        ) : (
          <Login switchToSignup={() => setShowSignup(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="app-container">

      <SideBar
        recentChats={recentChats}
        setCurrentChat={setCurrentChat}
      />

      <Body
        recentChats={recentChats}
        setRecentChats={setRecentChats}
        currentChat={currentChat}
      />

    </div>
  );
};

export default App;