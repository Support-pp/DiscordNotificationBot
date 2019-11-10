import { Client, Message, RichEmbed } from "discord.js";
import { decode } from "punycode";
const jwt  = require('jsonwebtoken');
const fs = require('fs');
var privateKEY  = fs.readFileSync('./private.pem', 'utf8');
var publicKEY = fs.readFileSync('./public.pem', 'utf8');
const config = require('config-yml');


export class DiscordTS {
		private client: Client;

		constructor() {
			this.client = new Client()
		}

		public start(): void {
			this.client.on("ready", () => {
                console.log("[>] Connected.")
                console.log('Logged in as ' + this.client.user.tag)
			})

            this.client.on("message", msg => {
                if (msg.content === config.discord.cmd_id) {

                    if(!msg.member.hasPermission(config.discord.hasPermission)){
                        msg.reply(config.message.no_permission);
                        return;
                    }

                    var token = jwt.sign({ channel: msg.channel.id}, privateKEY, { algorithm:  "RS256" });
                    msg.reply(config.message.header_generate_new_token);
                    msg.channel.send("```"+token+"```");
                }


                if (msg.content.startsWith(config.discord.cmd_verify)) {
                    var res = msg.content.split(" ");
                    if (res.length != 2){
                        msg.reply(config.message.invalied_verify_cmd);
                        return;
                    }
                    try {
                        var decoded = jwt.verify(res[1], publicKEY);
                    } catch(err) {
                       msg.channel.send(config.message.jwt_token_incorrect);
                       return;
                    }

                    if (decoded.channel == msg.channel.id){
                       msg.channel.send(config.message.jwt_token_correct);
                       return;
                    }
                       msg.channel.send(config.message.jwt_token_correct_but_wrong_channel.replace("{channelid}", decoded.channel));
                }
            });


            this.client.login(config.discord.token)
		}

/*
 *  Send message to discord.
 */
        public send(msg: string, channel:string): void{
           const msgO = JSON.parse(msg);

            console.log("> Send " + JSON.stringify(msgO) + " to channel {"+channel+"}")

            if (msgO.embed){
                const embedMessage = new RichEmbed()
                     .setColor(config.discord.embedColor)
                    .setDescription(msgO.message)

                this.client.channels.get(channel).send(embedMessage);
                return;
            }
            this.client.channels.get(channel).send(msgO.message);
        }
	}