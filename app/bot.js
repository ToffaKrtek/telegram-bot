import TelegramBot from 'node-telegram-bot-api';

class Bot {
  // мб, токен не сохранять..т.к. не пригодится и всегда доступен из файла конфигурации
    constructor(token){
      this.token = token;
      this.bot = new TelegramBot(this.token, {polling: true})
    }

    // Все прослушки в одном методе
    listeners(){
      // Обработка входящих сообщений
      this.bot.on('message', (msg) => {
        const chat_id = msg.chat.id;
        const message = msg.text.toString().toLowerCase();
        let text = 'Default text';
        let options = {};
        switch (message){
          case 'active':
          text = 'Активные комманды: '
          options = {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Связаться со мной',
                    callback_data: 'contacts'
                  },
                  {
                    text: 'Список реализованных игр',
                    callback_data: 'games_list'
                  },
                  {
                    text: 'Игра месяца',
                    callback_data: 'game_frame'
                  }
                ]

              ]
            }
          }
          break;
          default:
          text = 'Неизвестная команда!';
          options = {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Список лоступных команд',
                    callback_data: 'commands_list'
                  }
                ]

              ]
            }
          }
          break;
        }

        this.sendText(chat_id, text, options);
        console.log(message);
      })
      // прослушка и обработка кнопок
      this.bot.on("callback_query", (callbackQuery) => {
        console.log(callbackQuery)
      })
    }

    //Метод для обработки отправляемых сообщение
    sendText(chat_id, text, options){
      this.bot.sendMessage(chat_id, text, options);
    }
}

export default Bot
