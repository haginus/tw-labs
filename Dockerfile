FROM node:14-alpine AS build
WORKDIR /usr/src/tw-labs
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm", "run", "start" ]
EXPOSE 3000