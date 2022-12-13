import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chats from "./components/Chats";
import JoinRoom from "./components/JoinRoom";
import Game from "./components/Game";
const socket = io("http://localhost:4000");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [chats, setChats] = useState(true);

  return (
    <div className="container">
      <Game socket={socket} room={room} />
      {room ? (
        <Chats
          socket={socket}
          room={room}
          trigger={chats}
          setTrigger={setChats}
          name={name}
        />
      ) : (
        <JoinRoom socket={socket} setRoom={setRoom} setName={setName} />
      )}
      <div className="icon-chat" onClick={() => setChats(!chats)}>
        <span>Chats</span>
      </div>
    </div>
  );
}

export default App;
