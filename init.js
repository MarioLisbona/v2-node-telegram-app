const express = require("express");

// Creating an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

messages = [];

const setMessages = (msg) => {
  messages.push(msg);
};

const getMessages = () => messages;

module.exports = { app, messages, setMessages, getMessages };
