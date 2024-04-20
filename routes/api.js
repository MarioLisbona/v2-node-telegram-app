const express = require("express");
const router = express.Router();
const { sendMessageFromClient } = require("../botHandlers");

// route to serve messages array
router.get("/messages", (req, res) => {
  res.json(messages);
});

// route
router.post("/messages", (req, res) => {
  const msg = req.body.message;
  messages.push(msg);
  sendMessageFromClient(process.env.CHAT_ID, msg, res);
});

module.exports = router;
