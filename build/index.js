'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const discord_1 = require("./discord");
const webapi_1 = require("./webapi");
const bot = new discord_1.DiscordTS();
bot.start();
const api = new webapi_1.WebApi();
api.start(bot);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUE7O0FBRVosdUNBQXFDO0FBQ3JDLHFDQUFpQztBQUVqQyxNQUFNLEdBQUcsR0FBYyxJQUFJLG1CQUFTLEVBQUUsQ0FBQTtBQUN0QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7QUFFWCxNQUFNLEdBQUcsR0FBVyxJQUFJLGVBQU0sRUFBRSxDQUFBO0FBQ2hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgRGlzY29yZFRTIH0gZnJvbSAnLi9kaXNjb3JkJ1xuaW1wb3J0IHsgV2ViQXBpIH0gZnJvbSAnLi93ZWJhcGknXG5cbmNvbnN0IGJvdDogRGlzY29yZFRTID0gbmV3IERpc2NvcmRUUygpXG5ib3Quc3RhcnQoKVxuXG5jb25zdCBhcGk6IFdlYkFwaSA9IG5ldyBXZWJBcGkoKVxuYXBpLnN0YXJ0KGJvdClcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vYnVpbGQifQ==
