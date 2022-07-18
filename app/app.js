import Bot from './bot.js'
import token from './config.js'
import Server from './server.js'
const port = 3000;


const bot = new Bot(token);
bot.listeners()

const server = new Server(port, bot)
