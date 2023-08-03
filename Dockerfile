FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json ./

USER node

RUN npm install --omit=dev

COPY --chown=node:node . .

CMD ["node", "src/index.js"]

EXPOSE 3000
