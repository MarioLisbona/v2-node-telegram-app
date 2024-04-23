require("dotenv").config();
const { bot } = require("./botSetup");
const {
  app,
  setChatId,
  getChatId,
  setMessages,
  getMessages,
} = require("./init");
const { handleMessage } = require("./lib");
const indexRoutes = require("./routes/index");

const { WebSocketServer } = require("ws");
const sockserver = new WebSocketServer({ port: 443 });

// bot handler for sent message in telegram application
bot.on("message", (msg) => {
  console.log(`Chat id ${msg.chat.id} created`);
  const chatId = msg.chat.id;
  const text = msg.text;

  setChatId(chatId);
  setMessages(text);
});

bot.on("new_chat_members", (msg) => {
  firstName = msg.new_chat_member.first_name;
  lastName = msg.new_chat_member.last_name;
  chatTitle = msg.chat.title;
  chatId = getChatId();

  bot.sendMessage(
    chatId,
    `Hi ${firstName} ${lastName}! Welcome to the ${chatTitle} Telegram chat group`
  );
});

// websocket connection with chat client
sockserver.on("connection", (ws) => {
  console.log("New client connected!");
  ws.on("close", () => console.log("Client has disconnected!"));

  // msg received from chat client
  ws.on("message", (data) => {
    // set variables

    msg = data.toString();
    chatId = getChatId();
    console.log("Message received----", msg, chatId);

    // update message array
    setMessages(msg);

    // echo message to telegram bot
    bot.sendMessage(chatId, msg);

    // stringify messages array and send to all connected clients
    const messages = getMessages();
    const messagesJSON = JSON.stringify(messages);

    sockserver.clients.forEach((client) => {
      console.log("distributing message: ", messages[messages.length - 1]);
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
      console.log("distributing message: ", messages[messages.length - 1]);
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
