// server.js
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let userIdFRs = ""; // In-memory user ID store

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Emit a test event upon connection to verify client-server communication
    socket.emit("testEvent", "Hello from server!");

    socket.on("updateUserIdFR", (userId) => {
      userIdFRs = userId;
      io.emit("checkUserIdFR", userId);
    });

    socket.on("updateCurrentOrderPage", () => {
      console.log("Server received updateCurrentOrderPage event"); // Verify the server receives this
      io.emit("updateCurrentOrderPage", true);
    });

    socket.on("disconnect", () => console.log("User disconnected"));
  });

  httpServer.listen(port, () => console.log(`> Ready on http://${hostname}:${port}`));
});
