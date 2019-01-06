# Qwa.la Telegram Bot

The Qwa.la Telegram bot, or "**QwalaBot**" for short, is a chatbot that allows
Telegram users to quickly and easily shorten links. To learn more about how
to use QwalaBot, please see the [full documentation](https://qwa.la/telegram-bot).

## Development

*Note, this section is intended for developers who want to install the QwalaBot
bot sever. If you want to use QwalaBot yourself or add it to a group chat,
please see the link above.*

QwalaBot uses the [Telegraf](https://telegraf.js.org) Telegram framework for
managing and sending messages. Because of this, it's easy to get your own
instance of the server running.

 - After cloning the repository, you need to edit `config.json` with your own
credentials.
 - Once you've added your details to `config.json`, you should be able to do `npm install` and `npm start` to start the server!
