FROM node:14-alpine


WORKDIR /usr/src/todo

COPY package-lock.json .
COPY package.json .
RUN npm ci
COPY . .

ENV NODE_ENVIROMMENT=development \
    PORT=8080 \
    JWT_SECRET="daioshdidhf8455d5sdsdsd45" \
    JWT_EXPIRES_IN=30d

EXPOSE 8080

CMD [ "nodemon", "server.js" ]

