FROM node:16.13

WORKDIR /frontend

COPY package*.json /frontend
COPY yarn.lock /frontend/
COPY ./frontend .

RUN yarn install

EXPOSE 3000

CMD yarn start