const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://login-sus.vercel.app"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("typing", (data) => {
    io.emit("showText", {
      userId: data.userId || socket.id, // use client id if sent
      loginType: data.type,
      field: data.field,
      value: data.value,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
