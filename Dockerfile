FROM node:16-alpine

WORKDIR /usr/bin/app

COPY . /usr/bin/app

RUN npm i 

CMD ["npm","run","dev"]
