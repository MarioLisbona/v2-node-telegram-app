require("dotenv").config();
const { app } = require("./init");
const indexRoutes = require("./routes/index");
const { createWebSocketServer } = require("./websocket-server");
const { setupTelegramBot } = require("./telegram-bot");

const bot = setupTelegramBot();

createWebSocketServer(bot);

console.log("Bot is running...");

// Use routes
app.use("/", indexRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
