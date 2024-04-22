require("dotenv").config();
const { bot } = require("./botSetup");
const { app } = require("./init");
const { handleMessage } = require("./botHandlers");
const indexRoutes = require("./routes/index");
const apiRoutes = require("./routes/api");

const { WebSocketServer } = require("ws");
const sockserver = new WebSocketServer({ port: 443 });

sockserver.on("connection", (ws) => {
  console.log("New client connected!");
  ws.send("connection established");
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (data) => {
    sockserver.clients.forEach((client) => {
      console.log(`distributing message: ${data}`);
      client.send(`${data}`);
    });
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});

console.log("Bot is running...");

// Use routes
app.use("/", indexRoutes);
app.use("/api", apiRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
