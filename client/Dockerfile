FROM node:16.13

WORKDIR /frontend

RUN npm install -g serve

COPY yarn.lock .

RUN yarn install

COPY . .

COPY .env.production .env.local

EXPOSE 3000

# CMD sh -c yarn install && yarn build && serve -s build -l 3000
CMD serve -s build -l 3000