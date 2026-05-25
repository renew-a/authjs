FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 3000

CMD ["yarn", "start:prod"]
