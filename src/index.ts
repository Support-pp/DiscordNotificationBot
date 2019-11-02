'use strict'

import { DiscordTS } from './discord'
import { WebApi } from './webapi'

const bot: DiscordTS = new DiscordTS()
const api: WebApi = new WebApi()
bot.start()
api.start()