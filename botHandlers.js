const { setChatID } = require("./envSetup");
const { bot } = require("./botSetup");

function handleMessage(msg, messages) {
  if (msg.text) {
    const chatId = msg.chat.id;
    // Set CHAT_ID to the chat ID of the received message
    // Only happens if no ID or Diff ID is set
    setChatID(chatId);

    messages.push(msg.text);
    console.log(
      "Message received from Telegram--->",
      messages[messages.length - 1]
    );
  }
}

function sendMessageFromClient(chatId, msg, res) {
  bot
    .sendMessage(chatId, msg)
    .then(() => {
      console.log("Message sent to bot--->", msg);
      res.sendStatus(200); // Send a success response
    })
    .catch((error) => {
      console.error("Error sending message to bot:", error);
      res.sendStatus(500); // Send an error response
    });
}

module.exports = { handleMessage, sendMessageFromClient };
