FROM node:16.18.0-alpine3.15

WORKDIR /app

COPY package-lock.json . 

COPY package.json . 

RUN npm install 

COPY . /app 

RUN npx prisma generate

EXPOSE 3333 

CMD ["npm", "run", "start:dev"]