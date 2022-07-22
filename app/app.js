import Bot from './bot.js'
import config from './config.js'
import Server from './server.js'
const chat_id = config.telegram.chat_id ? config.telegram.chat_id : null

const bot = new Bot(config.telegram.token, chat_id);
bot.listeners()

const server = new Server(config.server.port, config.server.token, bot)
