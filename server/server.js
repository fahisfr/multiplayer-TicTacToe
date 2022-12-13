const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 4000;
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join-room", async ({ room, name }) => {
    console.log(`${name} joined room ${room}`);
    socket.join(room);
    socket.to(room).emit("message", { message: `joined `, name });
  });
  socket.on("play", ({ index, room }) => {
    socket.to(room).emit("update-game", index);
  });

  socket.on("room-message", ({ room, message, name }) => {
    socket.to(room).emit("message", { message, name });
  });

  socket.on("play-agin", (room) => {
    socket.to(room).emit("reset", {});
  });

  socket.on("disconnect", () => {
    console.log("user Disconnected");
  });
});

server.listen(port, () => console.log(`server running port ${port}`));
