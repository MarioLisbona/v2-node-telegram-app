const fs = require("fs");
const dotenv = require("dotenv");

function setChatID(chatID) {
  // Load existing environment variables from .env file
  const envConfig = dotenv.parse(fs.readFileSync(".env"));

  // Check if CHAT_ID environment variable already exists
  if (!process.env.CHAT_ID || process.env.CHAT_ID !== chatID) {
    // Set or modify the CHAT_ID environment variable
    envConfig.CHAT_ID = chatID;

    // Write the updated environment variables to .env file
    fs.writeFileSync(".env", stringify(envConfig));

    console.log(".env file updated successfully");
  } else {
    console.log(
      "CHAT_ID already exists in the environment with the same value. Skipping..."
    );
  }
}

// Helper function to convert object to dotenv format
function stringify(obj) {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("\n");
}

module.exports = { setChatID };
