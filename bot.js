// Export a function that sets up bot message handling logic
module.exports = function (bot) {
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    // Echo the received message back to the chat
    bot.sendMessage(chatId, `You said: ${msg.text}`);
  });
};
