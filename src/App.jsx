import React, { useState } from "react";
import SideBar from "./components/Sidebar/SideBar";
import Body from "./components/Body/Body";
import "./App.css";

const App = () => {
  const [recentChats, setRecentChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <div className="app-container">
        <SideBar 
        recentChats={recentChats} 
        setCurrentChat={setCurrentChat} />
        <Body
          recentChats={recentChats}
          setRecentChats={setRecentChats}
          currentChat={currentChat}
        />
    </div>
  );
};

export default App;
