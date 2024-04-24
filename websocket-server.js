const WebSocket = require("ws");
const { getChatId, setMessages, getMessages } = require("./init");

function createWebSocketServer(bot) {
  const sockserver = new WebSocket.Server({
    port: 443,
  });

  sockserver.on("connection", (ws) => {
    console.log("New client connected!");

    ws.on("message", (message) => {
      const data = JSON.parse(message);
      console.log("data", data);

      if (data.type === "login") {
        console.log("Log in attempt");
        if (data.username === "example" && data.password === "password") {
          // If credentials are valid, send success response
          ws.send(
            JSON.stringify({
              type: "loginSuccess",
              message: "Login successful",
            })
          );
        } else {
          // If credentials are invalid, send failure response
          ws.send(
            JSON.stringify({
              type: "loginFailure",
              message: "Invalid username or password",
            })
          );
        }
      } else if (data.type === "client-msg") {
        console.log("client sending text");
        try {
          const msg = data.message;
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
