'use strict'

import { DiscordTS } from './discord'
import { WebApi } from './webapi'

const bot: DiscordTS = new DiscordTS()
bot.start()

const api: WebApi = new WebApi()
api.start(bot)
