FROM node:10

COPY [".", "/usr/src/"]

WORKDIR /usr/src

RUN npm install --only=development

EXPOSE 3000

CMD ["npm", "nodemon", "server.js"]


