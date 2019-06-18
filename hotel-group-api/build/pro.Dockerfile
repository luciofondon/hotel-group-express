FROM node:10 as builder

COPY [".", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

EXPOSE 3000

RUN npm install --only=development

RUN npm run test

# Productive image
FROM node:10

COPY [".", "/usr/src/"]

WORKDIR /usr/src

RUN npm install --only=production

EXPOSE 3000

COPY --from=builder ["/usr/src/server.js", "usr/src/"]

RUN npm run test