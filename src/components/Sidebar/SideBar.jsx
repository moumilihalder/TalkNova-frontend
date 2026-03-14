import React, { useState, useEffect } from 'react'
import './Sidebar.css'

const SideBar = ({ recentChats, setRecentChats, setCurrentChat }) => {

  const [extended, setExtended] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setRecentChats(data);
      });

  }, []);

  return (
    <div className='sidebar'>

      <div className="top">

        <lord-icon
          className="menu"
          src="https://cdn.lordicon.com/axroojxh.json"
          trigger="hover"
          onClick={() => setExtended(prev => !prev)}>
        </lord-icon>

        <div className="new-chat" onClick={() => window.location.reload()}>
          <p className='plus'>+</p>
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">

            <p className="recent-title">Recent</p>

            {recentChats.length === 0 ? (
              <p className="empty-recent">No recent chats yet</p>
            ) : (
              recentChats.map((chat) => (

                <div
                  key={chat._id}
                  className="recent-entry"
                  onClick={() => setCurrentChat(chat)}
                >

                  <lord-icon
                    src="https://cdn.lordicon.com/motnbmtz.json"
                    trigger="hover">
                  </lord-icon>

                  <p>{chat.userMessage.slice(0, 20)}...</p>

                </div>

              ))
            )}

          </div>
        )}

      </div>

      <div className="bottom">

        <div className="bottom-item recent-entry">
          <lord-icon
            src="https://cdn.lordicon.com/biqqsrac.json"
            trigger="hover">
          </lord-icon>
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry">
          <lord-icon
            src="https://cdn.lordicon.com/ibjcmcbv.json"
            trigger="hover">
          </lord-icon>
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry">
          <lord-icon
            src="https://cdn.lordicon.com/asyunleq.json"
            trigger="hover">
          </lord-icon>
          {extended && <p>Setting</p>}
        </div>

      </div>

    </div>
  )
}

export default SideBar