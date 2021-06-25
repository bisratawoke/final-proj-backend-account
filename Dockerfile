FROM nodejscn/node 

WORKDIR /usr/bin/app

COPY . /usr/bin/app

RUN npm i 

CMD ["npm","run","dev"]
