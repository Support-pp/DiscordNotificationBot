FROM node:10-alpine
LABEL maintainer="KlexHub UG (haftungsbeschränkt) <support@support-pp.de>"
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
RUN npm build
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "npm", "start" ]
