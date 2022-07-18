import express from 'express';
import bodyParser from 'body-parser';
import BotService from './botservice.js'


class Server {
  constructor(port, bot){
    //this.bot = bot;
    this.app = express();
    this.app.use( bodyParser.json() );
    this.app.use( bodyParser.urlencoded({
      extended: true
    }))
    this.listeners();
    this.app.listen(port)
    this.botservice = new BotService(bot)
  }

  listeners(){
    this.app.post('/', (req, res) => {

      if(req.body.data){
        this.botservice.queryProcessing(req.body.data).then(
          res.status(200).send('True');
        ).catch( msg => {
          console.log(msg);
          res.status(400).send('False');
        })

      }else {
        res.status(400).send('False');
      }

   })

  }
}
export default Server;
