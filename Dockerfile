FROM node:12-alpine
LABEL maintainer="KlexHub UG (haftungsbeschränkt) <support@support-pp.de>"
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
COPY --chown=node:node ./config.yml ./dist/config.yml
RUN npm run build
EXPOSE 8080
WORKDIR /home/node/app/dist
CMD [ "node", "index.js" ]
