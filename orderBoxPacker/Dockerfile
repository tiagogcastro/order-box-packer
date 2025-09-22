FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/main.js"]
