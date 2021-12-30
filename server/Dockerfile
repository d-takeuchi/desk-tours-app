FROM node:16.13

WORKDIR /backend
COPY package*.json /backend/

RUN npm i -g @nestjs/cli

RUN npm i

ENV TZ Asia/Tokyo

CMD [ "npm", "run", "start:dev"]