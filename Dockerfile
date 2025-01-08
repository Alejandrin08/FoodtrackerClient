FROM node:18-alpine  

RUN npm install -g npm@10

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm config set fetch-timeout 600000

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "build", "-l", "3000", "--single"]
