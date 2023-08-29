FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN apt-get update && apt-get install -y ffmpeg
