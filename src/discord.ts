import { Client, Message } from "discord.js";
import { decode } from "punycode";
const jwt  = require('jsonwebtoken');
const fs = require('fs');
var privateKEY  = fs.readFileSync('./private.pem', 'utf8');
var publicKEY = fs.readFileSync('./public.pem', 'utf8');


export class DiscordTS {
		private client: Client;

		constructor() {
			this.client = new Client()
		}

		public start(): void {
			this.client.on("ready", () => {
                console.log("[] Connected.")
                console.log('Logged in as ' + this.client.user.tag)
			})

            this.client.on("message", msg => {
                if (msg.content === "!id") {

                    var payload = {
                        channel: msg.channel.id,
                    };

                    var signOptions = {
                        algorithm:  "RS256"
                    };
                    var token = jwt.sign(payload, privateKEY, signOptions);
                    console.log("Token :" + token);
                    msg.reply("hey take a other look, so much has change. We redevelop our Discord Bot. More features and performance upgrades.");
                    msg.channel.send("```"+token+"```");
                }


                if (msg.content.startsWith("!verify")) {
                    var res = msg.content.split(" ");
                    if (res.length != 2){
                        msg.reply("please use this debug function correctly. `!verify <jwt-token>`");
                        return;
                    }
                    var signOptions = {
                        algorithm:  "RS256"
                    };

                    try {
                        var decoded = jwt.verify(res[1], publicKEY);
                    } catch(err) {
                       msg.channel.send(":no_entry:  This jwt token is incorrect. Please generate a new token. `!id`");
                       return;
                    }

                    if (decoded.channel == msg.channel.id){
                       msg.channel.send(":white_check_mark: This jwt token is correct. You can use it for this channel.");
                       return;
                    }
                       msg.channel.send(":negative_squared_cross_mark: This jwt token is correct. **But** the token is for channel: `" + decoded.channel + "` You can't use this token for this channe!");
                }
            });


            this.client.login("")
		}

        public send(): void{
            console.log("> Send")
        }
	}