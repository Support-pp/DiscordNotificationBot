"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const jwt = require('jsonwebtoken');
const fs = require('fs');
var privateKEY = fs.readFileSync('./private.pem', 'utf8');
var publicKEY = fs.readFileSync('./public.pem', 'utf8');
class DiscordTS {
    constructor() {
        this.client = new discord_js_1.Client();
    }
    start() {
        this.client.on("ready", () => {
            console.log("[] Connected.");
            console.log('Logged in as ' + this.client.user.tag);
        });
        this.client.on("message", msg => {
            if (msg.content === "!id") {
                var payload = {
                    channel: msg.channel.id,
                };
                var signOptions = {
                    algorithm: "RS256"
                };
                var token = jwt.sign(payload, privateKEY, signOptions);
                console.log("Token :" + token);
                msg.reply("hey take a other look, so much has change. We redevelop our Discord Bot. More features and performance upgrades.");
                msg.channel.send("```" + token + "```");
            }
            if (msg.content.startsWith("!verify")) {
                var res = msg.content.split(" ");
                if (res.length != 2) {
                    msg.reply("please use this debug function correctly. `!verify <jwt-token>`");
                    return;
                }
                var signOptions = {
                    algorithm: "RS256"
                };
                try {
                    var decoded = jwt.verify(res[1], publicKEY);
                }
                catch (err) {
                    msg.channel.send(":no_entry:  This jwt token is incorrect. Please generate a new token. `!id`");
                    return;
                }
                if (decoded.channel == msg.channel.id) {
                    msg.channel.send(":white_check_mark: This jwt token is correct. You can use it for this channel.");
                    return;
                }
                msg.channel.send(":negative_squared_cross_mark: This jwt token is correct. **But** the token is for channel: `" + decoded.channel + "` You can't use this token for this channe!");
            }
        });
        this.client.login("");
    }
    send() {
        console.log("> Send");
    }
}
exports.DiscordTS = DiscordTS;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRVksSUFBSTtRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDekIsQ0FBQztDQUNQO0FBOURGLDhCQThERSIsImZpbGUiOiJkaXNjb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xpZW50LCBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gXCJwdW55Y29kZVwiO1xuY29uc3Qgand0ICA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xudmFyIHByaXZhdGVLRVkgID0gZnMucmVhZEZpbGVTeW5jKCcuL3ByaXZhdGUucGVtJywgJ3V0ZjgnKTtcbnZhciBwdWJsaWNLRVkgPSBmcy5yZWFkRmlsZVN5bmMoJy4vcHVibGljLnBlbScsICd1dGY4Jyk7XG5cblxuZXhwb3J0IGNsYXNzIERpc2NvcmRUUyB7XG5cdFx0cHJpdmF0ZSBjbGllbnQ6IENsaWVudDtcblxuXHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0dGhpcy5jbGllbnQgPSBuZXcgQ2xpZW50KClcblx0XHR9XG5cblx0XHRwdWJsaWMgc3RhcnQoKTogdm9pZCB7XG5cdFx0XHR0aGlzLmNsaWVudC5vbihcInJlYWR5XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltdIENvbm5lY3RlZC5cIilcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTG9nZ2VkIGluIGFzICcgKyB0aGlzLmNsaWVudC51c2VyLnRhZylcblx0XHRcdH0pXG5cbiAgICAgICAgICAgIHRoaXMuY2xpZW50Lm9uKFwibWVzc2FnZVwiLCBtc2cgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtc2cuY29udGVudCA9PT0gXCIhaWRcIikge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogbXNnLmNoYW5uZWwuaWQsXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpZ25PcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtOiAgXCJSUzI1NlwiXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IGp3dC5zaWduKHBheWxvYWQsIHByaXZhdGVLRVksIHNpZ25PcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUb2tlbiA6XCIgKyB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIG1zZy5yZXBseShcImhleSB0YWtlIGEgb3RoZXIgbG9vaywgc28gbXVjaCBoYXMgY2hhbmdlLiBXZSByZWRldmVsb3Agb3VyIERpc2NvcmQgQm90LiBNb3JlIGZlYXR1cmVzIGFuZCBwZXJmb3JtYW5jZSB1cGdyYWRlcy5cIik7XG4gICAgICAgICAgICAgICAgICAgIG1zZy5jaGFubmVsLnNlbmQoXCJgYGBcIit0b2tlbitcImBgYFwiKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmIChtc2cuY29udGVudC5zdGFydHNXaXRoKFwiIXZlcmlmeVwiKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzID0gbXNnLmNvbnRlbnQuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmxlbmd0aCAhPSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZy5yZXBseShcInBsZWFzZSB1c2UgdGhpcyBkZWJ1ZyBmdW5jdGlvbiBjb3JyZWN0bHkuIGAhdmVyaWZ5IDxqd3QtdG9rZW4+YFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgc2lnbk9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG06ICBcIlJTMjU2XCJcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlY29kZWQgPSBqd3QudmVyaWZ5KHJlc1sxXSwgcHVibGljS0VZKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgbXNnLmNoYW5uZWwuc2VuZChcIjpub19lbnRyeTogIFRoaXMgand0IHRva2VuIGlzIGluY29ycmVjdC4gUGxlYXNlIGdlbmVyYXRlIGEgbmV3IHRva2VuLiBgIWlkYFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlY29kZWQuY2hhbm5lbCA9PSBtc2cuY2hhbm5lbC5pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgIG1zZy5jaGFubmVsLnNlbmQoXCI6d2hpdGVfY2hlY2tfbWFyazogVGhpcyBqd3QgdG9rZW4gaXMgY29ycmVjdC4gWW91IGNhbiB1c2UgaXQgZm9yIHRoaXMgY2hhbm5lbC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICBtc2cuY2hhbm5lbC5zZW5kKFwiOm5lZ2F0aXZlX3NxdWFyZWRfY3Jvc3NfbWFyazogVGhpcyBqd3QgdG9rZW4gaXMgY29ycmVjdC4gKipCdXQqKiB0aGUgdG9rZW4gaXMgZm9yIGNoYW5uZWw6IGBcIiArIGRlY29kZWQuY2hhbm5lbCArIFwiYCBZb3UgY2FuJ3QgdXNlIHRoaXMgdG9rZW4gZm9yIHRoaXMgY2hhbm5lIVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5sb2dpbihcIlwiKVxuXHRcdH1cblxuICAgICAgICBwdWJsaWMgc2VuZCgpOiB2b2lke1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCI+IFNlbmRcIilcbiAgICAgICAgfVxuXHR9Il0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9idWlsZCJ9
