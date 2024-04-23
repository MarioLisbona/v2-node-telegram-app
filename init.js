const express = require("express");

// Creating an instance of Express
const app = express();

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

const setChatId = (chatId) => {
  CHAT_ID = chatId;
};

const getChatId = () => CHAT_ID;

module.exports = {
  app,
  messages,
  setMessages,
  getMessages,
  setChatId,
  getChatId,
};
