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
const { createWebSocketServer } = require("./websocket-server");

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

  if (chatText) {
    setMessages(chatText);
  }
});

const sockserver = createWebSocketServer(
  bot,
  getChatId,
  setMessages,
  getMessages
);

console.log("Bot is running...");

// Use routes
app.use("/", indexRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
