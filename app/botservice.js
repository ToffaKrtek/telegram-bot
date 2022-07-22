
class BotService {
  constructor(bot){
    this.bot = bot;
  }

  queryProcessing(query){
    return new Promise( (resolve, reject) => {
//      const data = JSON.parse(query);

      if (query.author && query.msg){
        this.bot.NewMessage(query.author, query.msg)
      }else {
        console.log(typeof(query), query)
      }
      resolve(true)
    })

  }
}

export default BotService
