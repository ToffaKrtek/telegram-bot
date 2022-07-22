import TelegramBot from 'node-telegram-bot-api';
import * as fs from 'fs';

class Bot {
  // мб, токен не сохранять..т.к. не пригодится и всегда доступен из файла конфигурации
    constructor(token, main_chat_id){
    //  this.token = token;
      this.bot = new TelegramBot(token, {polling: true})
      this.main_chat_id = main_chat_id
    }

    // Все прослушки в одном методе
    listeners(){
      // Обработка входящих сообщений
      this.bot.on('message', (msg) => {
        const chat_id = msg.chat.id;
        const message = msg.text.toString().toLowerCase();

        switch (message){
          case 'active':
            this.active(chat_id);
            break;
          case 'contacts':
            this.contacts(chat_id);
            break;
          case 'addtolocalstorage':
            this.addToLocalStorage(chat_id);
            break;
          default:
            this.wrongComand(chat_id);
            break;
        }

      })
      // прослушка и обработка кнопок
      this.bot.on("callback_query", (callbackQuery) => {
        //console.log(callbackQuery)

        const button = callbackQuery.data;
        const chat_id = callbackQuery.message.chat.id;
        this.deleteMessage(chat_id, callbackQuery.message.message_id);

        if (button.startsWith('cancel')){
          this.moveGroup(button, chat_id);
        }else {
          this.menuGroup(button, chat_id);
        }
      })
      this.bot.on('polling_error', (msg) => {
        console.log(msg)
      })
    }
    // Кнопки отмены...мб. при необходимости пагинация
    moveGroup(query, chat_id){
      if (query.startsWith('cancel')){
        const moveTo = query.split(':')[1];
        this.menuGroup(moveTo, chat_id);
      }
    }

    // Обработка активных кнопок
    menuGroup(query, chat_id){
      let text = '';
      let options = {};
      switch (query) {
        case 'contacts':
          this.contacts(chat_id)
          break;
        case 'commands_list':
          this.commands_list(chat_id);
          break;
        case 'games_list':
          text = '1) 1\n2) 2';
          options = {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Выбрать:',
                    callback_data: 'search'
                  }
                ]
              ]
            }
          }
          break;
       case 'game_frame':
         text = 'game';
         options = {
           reply_markup: {
             inline_keyboard: [
               [
                 {
                   text: 'GAME',
                   callback_data: 'game_start'
                 }
               ]
             ]
           }
         }
         break;
       case 'active':
          this.active(chat_id)
          break;
      default:
        this.wrongComand(chat_id)
        break;

        }
    }
    //Метод для обработки отправляемых сообщение
    sendText(chat_id, text, options){
      this.bot.sendMessage(chat_id, text, options);
    }

    deleteMessage(chat_id, message_id){
      this.bot.deleteMessage(chat_id, message_id)
    }

    sendGame(chat_id, game_name){}


    active(chat_id){
      const text = 'Активные комманды: '
      const options = {
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
      this.sendText(chat_id, text, options)
    }


    wrongComand(chat_id){
      const text = 'Неизвестная команда!';
      const options = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Список лоступных команд',
                callback_data: 'commands_list'
              },
              {
                text: 'Главное меню',
                callback_data: 'cancel:active'
              }
            ]

          ]
        }
      }
      this.sendText(chat_id, text, options)
    }

    contacts(chat_id){
      const text = '<a href="https://github.com/ToffaKrtek">github</a>\n@toffa_krtek'
      const options = {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Главное меню',
                callback_data: 'cancel:active'
              }
            ]
          ]
        }
      }
      this.sendText(chat_id, text, options)
    }

    commands_list(chat_id){
      const text = 'Список доступных команд:\n<b>active</b> -- главное меню\n<b>contacts</b> -- контакты\n<b>addToLocalStorage</b> -- добавить свой чат в общую рассылку'
      const options = {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Главное меню',
                callback_data: 'cancel:active'
              }
            ]
          ]
        }
      }
      this.sendText(chat_id, text, options)
    }

    addToLocalStorage(chat_id){
      const data = fs.readFile('localstorage.json', (err, data) => {
        if(err) throw err;
        let localdata = JSON.parse(data);
        localdata.chat_id.push(chat_id)
        fs.writeFileSync('localstorage.json', JSON.stringify(localdata));
        const text = 'Чат добавлен в локальное хранилище';
        const options = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Вернуться',
                  callback_data: 'cancel:active'
                }
              ]

            ]
          }
        }
        this.sendText(chat_id, text, options)
      })
    }

    getChatsFromLocalStorage(){
      const data = JSON.parse(fs.readFileSync('localstorage.json'))

      return data.chat_id
    }

    NewMessage(author, message){
      const text = 'Новое сообщение с сайта\n' +  '\nОт:\n' + author + '\nСообщение\n' + message;
      const options = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Главное меню',
                callback_data: 'cancel:active'
              }
            ]

          ]
        }
      }
      if(this.main_chat_id == null){
        const chats = this.getChatsFromLocalStorage();
        for (let i in chats){
          this.sendText(chats[i], text, options);
        }
    }else {
      this.sendText(this.main_chat_id, text, options);
    }
    }
}

export default Bot
