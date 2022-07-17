import Bot from './bot.js'
import token from './config.js'


const bot = new Bot(token);
bot.listeners()
