const express = require("express");
const router = express.Router();
const path = require("path");

// Express route to serve HTML file
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../websocket-client.html"));
});

module.exports = router;
