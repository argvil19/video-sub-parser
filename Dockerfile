FROM node:10-alpine

RUN apk update
RUN apk add ffmpeg python2 py-pip
RUN pip install autosub

USER node
RUN mkdir /home/node/app

WORKDIR /home/node/app
COPY package.json ./
RUN npm i

CMD [ "npm", "run", "dev" ]
