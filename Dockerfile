FROM node:20.18.3-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . . 

RUN yarn build

EXPOSE 3000

CMD [ "npx", "serve", "-s", "dist" ]
