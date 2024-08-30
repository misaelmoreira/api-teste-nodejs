FROM node:alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN yarn install

COPY ./.env .

COPY ./dist .
 
EXPOSE 3000

CMD ["yarn", "start"]