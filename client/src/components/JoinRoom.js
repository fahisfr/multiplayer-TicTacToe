import React, { useState } from "react";
import "../styles/joinRoom.scss";
import { faker } from "@faker-js/faker";

function JoinRoom({ setName, setRoom, socket }) {
  const [nameInput, setNameInput] = useState(faker.name.firstName() ?? "");
  const [roomInput, setRoomInput] = useState("");

  const joinRoomNow = (e) => {
    e.preventDefault();
    socket.emit("join-room", { room: roomInput, name: nameInput });
    setName(nameInput);
    setRoom(roomInput);
  };
  return (
    <div className="join-room-container">
      <form className="jr" onSubmit={joinRoomNow}>
        <div>
          <label for="name" className="jr-label">
            Name
          </label>
          <input
            value={nameInput}
            id="name"
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your Name"
            className="jr-input"
            required
          />
        </div>
        <div>
          <label form="room-id" className="jr-label">
            Room id
          </label>
          <input
            value={roomInput}
            type="number"
            id="room-id"
            onChange={(e) => setRoomInput(e.target.value)}
            className="jr-input"
            placeholder="Enter Room Number:000"
            required
          />
        </div>
        <button className="jr-button" type="submit">
          Join Room
        </button>
      </form>
    </div>
  );
}

export default JoinRoom;
