FROM node:10-alpine

RUN apk update
RUN apk add ffmpeg python2 py-pip
RUN pip install autosub

USER node
WORKDIR /home/node/app

CMD [ "npm", "run", "dev" ]
