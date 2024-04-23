require("dotenv").config();
const { bot } = require("./botSetup");
const {
  app,
  setChatId,
  getChatId,
  setMessages,
  getMessages,
} = require("./init");
const indexRoutes = require("./routes/index");

const { WebSocketServer } = require("ws");
const sockserver = new WebSocketServer({ port: 443 });

// Set the chat ID and log message when group chat is created
bot.on("group_chat_created", (msg) => {
  const chatId = msg.chat.id;
  const chatTitle = msg.chat.title;
  length = chatId.length + chatTitle.length;

  setChatId(chatId);
  console.log(`Chat group: ${chatTitle}(${msg.chat.id}) created`);
});

// send Welcome message when new members are added to the chat
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

// update messages array when telegram groupchat messages are sent
// set chatID incase group is already created..bit redundant but its necessary because
// were not storing chatID yet..
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const chatText = msg.text;

  setChatId(chatId);
  setMessages(chatText);
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
  bot.on("message", (msg) => {
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
