FROM node:20.11.1-alpine3.18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000

RUN addgroup app && adduser -S -G app app
USER app

CMD [ "npm", "start" ]