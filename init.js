const express = require("express");

// Creating an instance of Express
const app = express();

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(express.json());

// array of sent messages
let messages = [];

// push new message to messages array
const setMessages = (msg) => {
  messages.push(msg);
};

// retrieve the array of messages
const getMessages = () => messages;

let CHAT_ID = "";

// Function to set the chat ID environment variable
function setChatId(chatId) {
  process.env.CHAT_ID = chatId.toString();
}

// Function to retrieve the chat ID environment variable
function getChatId() {
  return process.env.CHAT_ID;
}

module.exports = {
  app,
  messages,
  setMessages,
  getMessages,
  setChatId,
  getChatId,
};
