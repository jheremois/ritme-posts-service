FROM node:14-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
ENV PORT 8080
ENV HOST 0.0.0.0

EXPOSE 8080

CMD [ "yarn", "start" ]