'use strict';
import { DiscordTS } from './discord';
import { WebApi } from './webapi';
const bot = new DiscordTS();
bot.start();
const api = new WebApi();
api.start(bot);
//# sourceMappingURL=index.js.map