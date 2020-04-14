
![Discord|690x388,100%](https://meta.support-pp.de/uploads/default/original/1X/e886fc655e0568a840e5a0f5fb955ce4e7f2e180.png)
# DiscordNotificationBot
This is the offical discord bot to send messages from Sinuusbot Support++ to your discord channel. You can use the hosted version by Support++ or set up your own.

# How can I use it?
You neede Sinusbot > 1.0.0 with Support++ > 2.6.0
https://meta.support-pp.de/t/discord-module-2-6-0/19?u=verhext
Follow this manuel step by step!

# You want self host the bot?
You can find the manuel here: https://meta.support-pp.de/t/discord-module-2-6-0-selfhost/29

# 1 Install 
`npm install`

# 2 Generate Keys

`openssl genrsa -out private.pem 2048`

`openssl rsa -in private.pem -outform PEM -pubout -out public.pem`

Set as env.

`docker secret create private.pem private.pem`

`docker secret create public.pem public.pem`