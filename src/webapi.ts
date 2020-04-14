import express = require('express');
const rateLimit = require("express-rate-limit");
var bodyParser = require('body-parser')
const jwt  = require('jsonwebtoken');
const fs = require('fs');
const index = require('./index');
var publicKEY = fs.readFileSync('/run/secrets/public.pem', 'utf8');
import { DiscordTS } from './discord'
import { readSync } from 'fs';

export class WebApi {


    public start(bot: DiscordTS): void {

        const app: express.Application = express();
        app.set('trust proxy', 1);
        app.use(bodyParser.urlencoded({ extended: false }))

        //Define API rate limit
        const limiter = rateLimit({
            windowMs: 1 * 60 * 1000,
            max: 5
        });
        app.use(limiter);

        app.get('/', function (req: any, res: any) {
            res.send('Hello World!');
        });

        //Validate JSON body.
        app.use((req: any, res:any, next:any) => {
            bodyParser.json()(req, res, (err: any) => {
                if (err) {
                    console.log("[->] Wrong json reuest.")
                      return res.status(400).json({
                            status: 400,
                            id: "JSON struct not valied."
                    });

                }
                next();
            });
        });
        app.post("/api/discord/notification", function(req: any, res: any){
            if (!req.headers.authorization){
                res.status(401).json({
                    status: 401,
                    message: "Please use Bearer Token. You get the token by typing !id to your discord channel."
                });
                return;
            }
            var authHeader = req.headers.authorization.replace("Bearer ","");
            try {
                var decoded = jwt.verify(authHeader, publicKEY);
            } catch(err) {
                res.status(401).json({
                    status: 401,
                    message: "The token is not correct. Please update your code. !id"
                });
                return;
            }

        try{
            if (req.body.embed == undefined || req.body.message == undefined){
                console.log("[->] Request property not set.")
                return   res.status(400).json({
                    status: 400,
                    message: "Your json body need the property (embed:bool) (message:string)"
                });
            }
            bot.send(JSON.stringify(req.body), decoded.channel);
        }catch(e){
            console.log("ERROR! :: " + JSON.stringify(req.body))
        }
            res.status(200).json({
                status: 200,
                id: "oke send"
            });
        })

        app.listen(8080, function () {
        console.log('Example app listening on port 8080!');

        });
    }

}
