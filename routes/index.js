const express = require("express");
const router = express.Router();
const path = require("path");

// index route
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// route to chat client
router.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "../chat-client.html"));
});

module.exports = router;
