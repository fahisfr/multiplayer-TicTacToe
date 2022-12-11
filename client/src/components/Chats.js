/** @format */

import "../styles/chats.scss";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

function Chats({ socket, room, name }) {
  const chatsRef = useRef(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
   
  ]);

  useEffect(() => {
    socket.on("message", (info) => {
      setChats([...chats, info]);
    });
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setChats([...chats, { message, from: "client" }]);
    socket.emit("room-message", { message, room, name });
    chatsRef.current?.scrollIntoView({ behavior: "smooth" });
    setMessage("");
  };
  return (
    <div className="sr-container">
      <div className="sr-wrappe">
        <div className="sr-top">
          <span>Your In Room {room}</span>
        </div>
        <div className="sr-center">
          <div className="chats">
            {chats.map((chat, index) => {
              return (
                <div
                  className={`chat ${
                    chat?.from === "client" ? "c-right" : "c-left"
                  }`}
                  key={index}
                >
                  <div className="text">
                    <span >{chat.message}</span>
                  </div>
                </div>
              );
            })}
            <div ref={chatsRef}></div>
          </div>
        </div>
        <form className="sr-bottom" onSubmit={onSubmit}>
          <input
            className="sr-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send Message"
            minlength="1"
            required
          />
          <button type="submit" className="sr-sent-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chats;
