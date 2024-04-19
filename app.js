// Importing necessary modules
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

// Replace 'YOUR_BOT_TOKEN' with the token you get from BotFather
const token = "6603956134:AAERpbZH_vmJguvj5pxUZc_QuGcDsWnFLW4";

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

messages = [];

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  messages.push(msg.text);

  console.log(
    "Message received from Telegram--->",
    messages[messages.length - 1]
  );
  // console.log("Message history", msgs);

  // // Echo the received message back to the chat
  // bot.sendMessage(chatId, `You said: ${msg.text}`);
});

console.log("Bot is running...");

// Creating an instance of Express
const app = express();

// Express route to serve HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// route to serve messages array
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// Start the server
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
