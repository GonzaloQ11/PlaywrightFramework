FROM node:20-bookworm

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV APP_USERNAME=Admin
ENV APP_PASSWORD=admin123

RUN npx -y playwright@1.49.1 install --with-deps
