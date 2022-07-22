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
        const data = JSON.parse(req.body.data)
        this.botservice.queryProcessing(data).then( status => {
          res.status(200).send('True');
        }).catch( msg => {
          res.status(400).send('False');
        })

      }else {
        console.log(req)
        res.status(400).send('False');
      }

   })

  }
}
export default Server;
