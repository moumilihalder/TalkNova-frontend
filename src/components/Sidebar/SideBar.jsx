import React from 'react'
import { useState } from 'react'
import './Sidebar.css'

const SideBar = ({ recentChats, setCurrentChat }) => {
  const [extended, setExtended] = useState(false);

  return (
    <div className='sidebar'>
      <div className="top">
        <lord-icon className="menu"
          src="https://cdn.lordicon.com/axroojxh.json"
          trigger="hover" onClick={() => setExtended(prev => !prev)}>
        </lord-icon>
        <div className="new-chat" onClick={() => window.location.reload()}>
          <p className='plus'>+</p>
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ?
          <div className="recent">
            <p className="recent-title">Recent</p>
            {recentChats.length === 0 ? (
              <p className="empty-recent">No recent chats yet</p>
            ) : (
              recentChats.map((chat, index) => (
                <div key={index} className="recent-entry">
                  <lord-icon
                    src="https://cdn.lordicon.com/motnbmtz.json"
                    trigger="hover"
                  ></lord-icon>
                  <p>{chat.slice(0, 20)}...</p>
                </div>
              ))
            )}
          </div> : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <lord-icon
            src="https://cdn.lordicon.com/biqqsrac.json"
            trigger="hover">
          </lord-icon>
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <lord-icon
            src="https://cdn.lordicon.com/ibjcmcbv.json"
            trigger="hover">
          </lord-icon>
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <lord-icon
            src="https://cdn.lordicon.com/asyunleq.json"
            trigger="hover">
          </lord-icon>
          {extended ? <p>Setting</p> : null}

        </div>

      </div>
    </div>
  )
}

export default SideBar 