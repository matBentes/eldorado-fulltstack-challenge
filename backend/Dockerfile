FROM node:16.18.0-alpine3.15

WORKDIR /app

COPY package-lock.json . 

COPY package.json . 

RUN npm install 

COPY . /app 

RUN apk add --no-cache bash

RUN chmod +x /app/wait-for-it.sh

RUN chmod +x /app/run-it.sh

RUN npx prisma generate

EXPOSE 3333 

CMD [ "./run-it.sh" ]