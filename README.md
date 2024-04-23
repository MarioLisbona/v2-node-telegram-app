# Telegram Bot Chat

## Setup instructions

### Create a local clone of this repo

```bash
git clone git@github.com:MarioLisbona/v2-node-telegram-app.git
```

### Create environment variables

1. cd into the directory

```bash
cd v2-node-telegram-app
```

2. Change the filename `.env.sample` to `.env`

### Create a new Telegram Bot

1. **Open Telegram:** Open the Telegram app on your device or use the web version.
2. **Search for BotFather:** In the search bar, type "BotFather" and select the BotFather account from the search results. BotFather is the official bot provided by Telegram for creating and managing bots.
3. **Start BotFather:** Start a chat with BotFather by clicking on the "Start" button.
4. **Create a New Bot:** Once you're in the chat with BotFather, type the following command to create a new bot:

```bash
/newbot
```

5. **Choose a Name:** BotFather will ask you to choose a name for your bot. This name will be displayed in Telegram chats and contact lists.
6. **Choose a Username:** Next, BotFather will ask you to choose a username for your bot. This username must be unique and end with "bot" (e.g., MyNewBot_bot).
7. **Bot Creation:** After providing a name and username, BotFather will confirm the details you've entered and provide you with a token for your new bot. This token is necessary for authenticating requests to the Telegram Bot API.
8. **Save the Token:** Copy the token and use its value for the `.env` key-pair `BOT_TOKEN`

### Install dependencies

- Run the following command to install the dependencies

```bash
npm install
```

### Run the App

- Run the following command to start the server

```bash
npm start
```

The front end will load at [http://localhost:3000](http://localhost:3000)

### Create a new Telegram chat and add the Bot

1. Create a new telegram chat and add the bot username
2. Open the chat and click the 3 dots in the top right corner and select `info`
3. Find the bot in the members list and click it
4. Click `Add to Group or Channel` and select the chat you want to use
5. Add the bot as Administrator

### Use the App

- If this is the first time you have created the chat, then you can send messages from either the client or the telegram app. This is because the `chatId` is set in the `group_chat_created` handler.
- If the the server restarts and connect to the bot in an existing chat, then the first message will need to be sent from the telegram app. This is because the `chatId` needs to be set in the `message` handler because it wasnt stored when the gourp was created.
