// Importing necessary modules
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { setChatID } = require("./envSetup");
const { bot } = require("./botSetup");

messages = [];

bot.on("message", (msg) => {
  if (msg.text) {
    const chatId = msg.chat.id;
    setChatID(chatId); // Set CHAT_ID to the chat ID of the received message

    messages.push(msg.text);
    console.log(
      "Message received from Telegram--->",
      messages[messages.length - 1]
    );
  }
});

console.log("Bot is running...");

// Creating an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Express route to serve HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// route to serve messages array
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// Route to handle messages sent from the client
app.post("/api/messages", (req, res) => {
  const msg = req.body.message;
  messages.push(msg);

  const CHAT_ID = process.env.CHAT_ID;

  bot
    .sendMessage(CHAT_ID, msg)
    .then(() => {
      console.log('"Message Received from Front end-------->"', msg);
      res.sendStatus(200); // Send a success response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
