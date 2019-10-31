'use strict'

import { Client, Message } from 'discord.js'
import * as debug from 'debug'
import * as path from 'path'
import * as YAML from 'yamljs'

// DEBUG PREPARE
// ----------------------------------------------------------------------------
	const logSystem	= debug('bot:system')
	const logEvent	= debug('bot:event')
	const logError	= debug('bot:error')
	const logWarn	= debug('bot:warn')

// DISCORD CLASS
// ----------------------------------------------------------------------------
	export class DiscordTS {
		private client: Client
		private config: any

		constructor() {
			this.client = new Client()
			this.config = YAML.load(path.resolve(__dirname, 'settings.yml'))
		}

		public start(): void {
			logSystem('Starting bot (...)')


            this.client.on('ready', () => {
                logEvent(`[${ this.config.settings.nameBot }] Connected.`)
                logEvent(`Logged in as ${ this.client.user.tag }`)
                this.client.user.setActivity(this.config.settings.activity)
            })


			this.client.on('message', (message: Message) => {

				if (message.author.id !== this.client.user.id) {

                    if (message.content === this.config.settings.prefix + 'ping') {
                        message.reply('Pong !')
                    }

                    if (message.content === this.config.settings.prefix + 'connect') {
                        message.reply('https://api.support-pp.de/authid')
                    }
				}
			})


				this.client.on('error', logError)
				this.client.on('warn', logWarn)


				process.on('exit', () => {
						logEvent(`[${ this.config.settings.nameBot }] Process exit.`)
						this.client.destroy()
					})
				process.on('uncaughtException', (err: Error) => {
						const errorMsg = (err ? err.stack || err : '').toString().replace(new RegExp(`${__dirname}\/`, 'g'), './')
						logError(errorMsg)
					})
				process.on('unhandledRejection', (err: Error) => {
						logError('Uncaught Promise error: \n' + err.stack)
					})

				this.client.login(this.config.settings.token)
		}
	}
