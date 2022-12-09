/** @format */

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("play", ({ index, room }) => {
    socket.to(room).emit("update-game", index);
  });


  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(4000, () => console.log("server running port 4000"));
