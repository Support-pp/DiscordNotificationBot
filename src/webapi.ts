import express = require('express');
const jwt  = require('jsonwebtoken');
const fs = require('fs');
var publicKEY = fs.readFileSync('./public.pem', 'utf8');

export class WebApi {

    public start(): void {

        const app: express.Application = express();

        app.get('/', function (req: any, res: any) {
            res.send('Hello World!');
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

            res.status(200).json({
                status: 200,
                id: ""
            });
        })

        app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
        });
    }

}