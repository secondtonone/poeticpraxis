FROM node:16.15-alpine3.15 AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY .eslintrc.js .
COPY .eslintignore .

COPY tsconfig.json .
COPY webpack.config.js .
COPY webpack.prod.config.js .
COPY webpack.dev.config.js .

COPY src src
COPY public public
COPY server.js .

RUN npm run build

EXPOSE 9090
CMD npm run server
