FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV CHOKIDAR_USEPOLLING=1 \
    WATCHPACK_POLLING=1000 \
    NEXT_HMR_POLL_INTERVAL=1000

CMD ["npm", "run", "dev-without-turbo"]
