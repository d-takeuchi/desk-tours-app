# FROM node:12.20.0
FROM node:16.13

RUN npm i -g @nestjs/cli

WORKDIR /backend

ENV TZ Asia/Tokyo
COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .
COPY .env.production .env

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start:prod"]