FROM node:lts
LABEL maintainer="Anthony Atkinson anthonyatkinson1@gmail.com"

RUN apt-get update && apt-get install -y curl sed
RUN npm install --global expo-cli
WORKDIR /tmp/webapp
COPY . .
RUN npm install && expo build:web

FROM node:lts
WORKDIR /home/node/app
COPY --from=0 /tmp/webapp .