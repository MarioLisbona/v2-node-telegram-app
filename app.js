require("dotenv").config();
const { bot } = require("./botSetup");
const { app } = require("./init");
const { handleMessage } = require("./lib");
const indexRoutes = require("./routes/index");
const { setMessages, getMessages } = require("./init");

const { WebSocketServer } = require("ws");
const sockserver = new WebSocketServer({ port: 443 });

bot.on("message", (telegramMsg) => {
  handleMessage(telegramMsg);
});

sockserver.on("connection", (ws) => {
  console.log("New client connected!");
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (data) => {
    msg = data.toString();
    chatId = process.env.CHAT_ID;

    setMessages(msg);

    bot.sendMessage(chatId, msg);

    console.log("message array needs to be sent to front end", getMessages());
    const messages = getMessages();
    const messagesJSON = JSON.stringify(messages);

    sockserver.clients.forEach((client) => {
      console.log("distributing message: ", messages);
      client.send(messagesJSON);
    });
  });
  ws.onerror = function () {
    console.log("websocket error");
  };

  bot.on("message", () => {
    // Get updated messages
    const messages = getMessages();
    const messagesJSON = JSON.stringify(messages);

    sockserver.clients.forEach((client) => {
      console.log("distributing message: ", messages);
      client.send(messagesJSON);
    });
  });
});

console.log("Bot is running...");

// Use routes
app.use("/", indexRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
