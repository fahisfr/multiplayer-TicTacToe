/** @format */

import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Chats from "./components/Chats";
import JoinRoom from "./components/JoinRoom";
const socket = io("http://localhost:4000");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [canPay, setCanPlay] = useState(true);
  console.log(room === true);
  useEffect(() => {
    socket.on("update-game", (index) => {
      let oldBoard = [...board];
      oldBoard[index] = "0";
      setBoard(oldBoard);
      setCanPlay(true);
    });
  });

  const onClick = (index) => {
    socket.emit("play", { index, room: 69 });
    let oldBoard = [...board];
    oldBoard[index] = "x";
    setBoard(oldBoard);
    setCanPlay(false);
  };

  return (
    <div className="app">
      <div className="container">
        <div className={`cell-wrappe`}>
          {board?.map((cell, index) => {
            return (
              <div key={index} className="cell" onClick={() => onClick(index)}>
                <span>{cell}</span>
              </div>
            );
          })}
        </div>

        {room ? (
          <Chats socket={socket} room={room} name={name} />
        ) : (
          <JoinRoom socket={socket} setRoom={setRoom} setName={setName} />
        )}
      </div>
    </div>
  );
}

export default App;
