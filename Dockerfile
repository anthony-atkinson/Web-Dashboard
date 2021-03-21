FROM node:lts
LABEL maintainer="Anthony Atkinson anthonyatkinson1@gmail.com"

RUN apt-get update && apt-get install -y curl sed
RUN npm install --global expo-cli
COPY . .
RUN npm install && expo build:web

FROM node:lts
COPY --from=0 /home/node/app .