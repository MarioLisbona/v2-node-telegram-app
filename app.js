// Importing necessary modules
const bodyParser = require("body-parser");
require("dotenv").config();
const { bot } = require("./botSetup");
const { app } = require("./init");
const { handleMessage, sendMessageToBot } = require("./botHandlers");

bot.on("message", (msg) => {
  handleMessage(msg, messages);
});

console.log("Bot is running...");

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
  console.log(req.body);
  const msg = req.body.message;
  messages.push(msg);
  sendMessageToBot(process.env.CHAT_ID, msg, res);
});

// Start the server
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
