require("dotenv").config();
const { bot } = require("./botSetup");
const { app } = require("./init");
const { handleMessage } = require("./lib");
const indexRoutes = require("./routes/index");
const { setMessages, getMessages } = require("./init");

const { WebSocketServer } = require("ws");
const sockserver = new WebSocketServer({ port: 443 });

// bot handler for sent message in telegram application
bot.on("message", (telegramMsg) => {
  // function updates messages array and sets chat ID if not already done
  handleMessage(telegramMsg);
});

// websocket connection with chat client
sockserver.on("connection", (ws) => {
  console.log("New client connected!");
  ws.on("close", () => console.log("Client has disconnected!"));

  // msg received from chat client
  ws.on("message", (data) => {
    // set variables
    msg = data.toString();
    chatId = process.env.CHAT_ID;

    // update message array
    setMessages(msg);

    // echo message to telegram bot
    bot.sendMessage(chatId, msg);

    // stringify messages array and send to all connected clients
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

  // bot handler for sent message in telegram application
  bot.on("message", () => {
    // stringify messages array and send to all connected clients
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
