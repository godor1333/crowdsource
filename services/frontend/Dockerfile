FROM node:12-alpine as builder
RUN npm install -g http-server
WORKDIR /app
COPY ./app/package.json /app/package.json
RUN npm install

COPY ./app  /app
RUN npm run build
EXPOSE 8080
USER node
CMD [ "http-server", "dist" ]
