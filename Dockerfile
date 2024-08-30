FROM node:alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN yarn install

COPY . .

RUN yarn build
 
EXPOSE 3000

CMD ["yarn", "start"]