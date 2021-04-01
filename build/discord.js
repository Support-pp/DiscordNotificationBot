import { Client, MessageEmbed } from "discord.js";
const jwt = require("jsonwebtoken");
const fs = require("fs");
var privateKEY = fs.readFileSync(process.env.PRIVATE_KEY_PATH || "/run/secrets/private.pem", "utf8");
var publicKEY = fs.readFileSync(process.env.PUBLIC_KEY_PATH || "/run/secrets/public.pem", "utf8");
const config = require("config-yml");
export class DiscordTS {
    constructor() {
        this.client = new Client();
    }
    start() {
        this.client.on("ready", () => {
            var _a;
            console.log("[>] Connected.");
            console.log("Logged in as " + ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.tag));
        });
        this.client.on("message", (msg) => {
            if (msg.content === config.discord.cmd_id) {
                try {
                    if (!msg.member.hasPermission(config.discord.hasPermission)) {
                        msg.reply(config.message.no_permission);
                        return;
                    }
                }
                catch (e) { }
                var token = jwt.sign({ channel: msg.channel.id }, privateKEY, {
                    algorithm: "RS256",
                });
                msg.reply(config.message.header_generate_new_token);
                msg.channel.send("```" + token + "```");
            }
            if (msg.content.startsWith(config.discord.cmd_verify)) {
                var res = msg.content.split(" ");
                if (res.length != 2) {
                    msg.reply(config.message.invalied_verify_cmd);
                    return;
                }
                try {
                    var decoded = jwt.verify(res[1], publicKEY);
                }
                catch (err) {
                    msg.channel.send(config.message.jwt_token_incorrect);
                    return;
                }
                if (decoded.channel == msg.channel.id) {
                    msg.channel.send(config.message.jwt_token_correct);
                    return;
                }
                msg.channel.send(config.message.jwt_token_correct_but_wrong_channel.replace("{channelid}", decoded.channel));
            }
        });
        this.client.login(process.env.TOKEN);
    }
    /*
     *  Send message to discord.
     */
    send(msg, channelId) {
        const msgO = JSON.parse(msg);
        console.log("> Send " + JSON.stringify(msgO) + " to channel {" + channelId + "}");
        let channel = this.client.channels.cache.find((c) => c.id == channelId);
        if (channel == undefined || channel == null)
            return;
        if (!channel.isText())
            return;
        if (msgO.embed) {
            const embedMessage = new MessageEmbed()
                .setColor(config.discord.embedColor)
                .setDescription(msgO.message);
            channel.send(embedMessage);
            return;
        }
        channel.send(msgO.message);
    }
}
//# sourceMappingURL=discord.js.map