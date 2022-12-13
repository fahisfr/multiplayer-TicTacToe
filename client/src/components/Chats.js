import "../styles/chats.scss";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

function Chats({ socket, room, name, trigger, setTrigger }) {
  const chatsRef = useRef(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket.on("message", (info) => {
      setChats([...chats, info]);
      chatsRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setChats([...chats, { message, from: "client" }]);
    socket.emit("room-message", { message, room, name });
    chatsRef.current?.scrollIntoView({ behavior: "smooth" });
    setMessage("");
  };
  return trigger ? (
    <div className="ct-container">
      <div className="ct-close" onClick={() => setTrigger(false)}></div>
      <div className="ct-wrappe">
        <div className="ct-top">
          <span>Your In Room {room}</span>
        </div>
        <div className="ct-center">
          <div className="chats">
            {chats.map((chat, index) => {
              return (
                <div
                  className={`chat ${
                    chat?.from === "client" ? "c-right" : "c-left"
                  }`}
                  key={index}
                >
                  {chat.name && <h4>{chat.name}</h4>}

                  <div className="text">
                    <span>{chat.message}</span>
                  </div>
                </div>
              );
            })}
            <div ref={chatsRef}></div>
          </div>
        </div>
        <form className="ct-bottom" onSubmit={onSubmit}>
          <input
            className="ct-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send Message"
            minlength="1"
            required
          />
          <button type="submit" className="ct-sent-button">
            Send
          </button>
        </form>
      </div>{" "}
    </div>
  ) : (
    ""
  );
}

export default Chats;
