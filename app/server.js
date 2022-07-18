import express from 'express';
import BotService from './botservice.js'


class Server {
  constructor(port, bot){
    //this.bot = bot;
    this.app = express();
    this.listeners();
    this.app.listen(port)
    this.botservice = new BotService(bot)
  }

  listeners(){
    this.app.get('/', (req, res) => {
      if(req.body.data){
        res.status(200).send('True')
      }else {
        res.status(400).send('False')
      }
   })

  }
}
export default Server;
