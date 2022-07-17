import TelegramBot from 'node-telegram-bot-api';

class Bot {
    constructor(token){
	this.token = token;
	this.bot = new TelegramBot(this.token, {polling: true})
    }
    listeners(){
	this.bot.on('message', (msg) => {
	    const chat_id = msg.chat.id;
	    this.sendText(chat_id, 'hi');
	    console.log(msg);
	})
    }
    sendText(chat_id, text){
	this.bot.sendMessage(chat_id, text);
    }
}


const bot = new Bot(token);
bot.listeners()
