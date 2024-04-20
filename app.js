// Importing necessary modules
const bodyParser = require("body-parser");
require("dotenv").config();
const { bot } = require("./botSetup");
const { app } = require("./init");
const { handleMessage, sendMessageFromClient } = require("./botHandlers");
const indexRoutes = require("./routes/index");
const apiRoutes = require("./routes/api");

bot.on("message", (msg) => {
  handleMessage(msg, messages);
});

console.log("Bot is running...");

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use routes
app.use("/", indexRoutes);
app.use("/api", apiRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
