# telegram-bot
ожидается, что в директории **app/** есть файл **config.js** с токеном бота
и пр. (пример: **./app/config-example.js**)       

----

при обращении на внутренний сервер данные (json) должны быть внутри общего ключа **data**        
Обрабатываются сообщения типа:
{
  data: \n
  {
    author: <author name>,\n
    message: <text message>\n
  }\n
}\n
