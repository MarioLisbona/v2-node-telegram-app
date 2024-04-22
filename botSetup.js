const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// Replace 'YOUR_BOT_TOKEN' with the token you get from BotFather
const BOT_TOKEN = process.env.BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// handle and echo messages that are received by the bot in the telegram chat
bot.on("message", (telegramMsg) => {
  handleMessage(telegramMsg);
});

module.exports = { bot };
