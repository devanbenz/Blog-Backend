FROM node:latest-alpine

WORKDIR /app

COPY . /app/

RUN yarn install

CMD ["yarn", "dev"]
