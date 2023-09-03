FROM node:latest

ENV NODE_ENV=production

WORKDIR /app

COPY . .
RUN rm -rf .env

RUN npm i --dev
RUN npm i -g npm:latest
RUN npm run build
CMD node dist/main.js

EXPOSE 3000
