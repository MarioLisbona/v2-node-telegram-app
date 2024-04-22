const { setChatID } = require("./envSetup");
const { bot } = require("./botSetup");
const { setMessages, getMessages } = require("./init");

function handleMessage(msg) {
  if (msg.text) {
    const chatId = msg.chat.id;
    messages = getMessages();
    // Set CHAT_ID to the chat ID of the received message
    // Only happens if no ID or Diff ID is set
    setChatID(chatId);

    setMessages(msg.text);

    console.log(
      "Message received from Telegram--->",
      messages[messages.length - 1]
    );
  }
}

module.exports = { handleMessage };
