FROM node:16.9-alpine

WORKDIR /usr/src/app

RUN apk update && apk add bash

COPY package*.json ./

COPY ./MOCK_DATA.json ./

COPY ./scripts/wait-for-it.sh ./

COPY ./scripts/docker-entrypoint.sh ./

RUN npm install

COPY . ./

RUN chmod +x ./wait-for-it.sh ./docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD [ "node", "index.js" ]