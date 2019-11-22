FROM node:10-alpine

USER node
RUN mkdir /home/node/server

WORKDIR /home/node/server
COPY package.json ./
RUN npm i

CMD [ "npm", "run", "dev" ]
