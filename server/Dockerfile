FROM node:16.13

RUN npm i -g @nestjs/cli

WORKDIR /api-server
COPY package*.json /api-server/

RUN npm i

ENV TZ Asia/Tokyo

CMD [ "npm", "run", "start:dev"]