const WebSocket = require("ws");
const { getChatId, setMessages, getMessages } = require("./init");

function createWebSocketServer(bot) {
  const sockserver = new WebSocket.Server({
    port: 443,
  });

  sockserver.on("connection", (ws) => {
    console.log("New client connected!");

    ws.on("message", (data) => {
      try {
        const msg = data.toString();
        const chatId = getChatId();

        // Update message array
        setMessages(msg);

        // Send message to Telegram bot
        bot.sendMessage(chatId, msg);

        // Broadcast updated messages to all connected clients
        broadcastMessages(sockserver, getMessages);
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    ws.on("close", () => {
      console.log("Client has disconnected!");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  // bot handler for sent message in telegram application
  try {
    bot.on("message", () => {
      broadcastMessages(sockserver, getMessages);
    });
  } catch (error) {
    console.error("Error processing bot message:", error);
  }

  return sockserver;
}

function broadcastMessages(sockserver, getMessages) {
  const messages = getMessages();
  const messagesJSON = JSON.stringify(messages);
  sockserver.clients.forEach((client) => {
    client.send(messagesJSON);
  });
}

module.exports = { createWebSocketServer };
