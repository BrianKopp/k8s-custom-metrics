FROM node:10.15-alpine

ENV NODE_ENV production

RUN mkdir /usr/app

WORKDIR /usr/app

ADD package*.json ./

RUN npm install --production

USER node

ADD ./src/ ./

CMD ["node", "src/index.js"]
