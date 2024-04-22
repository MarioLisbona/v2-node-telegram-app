const express = require("express");

// Creating an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// array of sent messages
messages = [];

// push new message to messages array
const setMessages = (msg) => {
  messages.push(msg);
};

// retrieve the array of messages
const getMessages = () => messages;

module.exports = { app, messages, setMessages, getMessages };
