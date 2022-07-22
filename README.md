# telegram-bot
ожидается, что в директории **app/** есть файл **config.js** с токеном бота
и пр. (пример: **./app/config-example.js**)       

----

при обращении на внутренний сервер данные (json) должны быть внутри общего ключа **data**        
Обрабатываются сообщения типа: <br>
{ <br>
  data: <br>
  {
    author: <author name>, <br>
    message: <text message> <br>
  } <br>
} <br>
