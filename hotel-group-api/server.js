'use strict'

const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const chalk = require('chalk')
const debug = require('debug')('hotelgroup:api')
//const api = require('./src/api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

// Express Error Handler

var api = asyncify(express.Router());
require('./src/routes/hotel')(api);
app.use('/api', api)

app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)
  if (err.message.match(/not found/)) {
    res.status(404).send({ error: err.message })
  }
  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal errror]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[hotelgroup-api]')} server listening on port ${port}`)
  })
}

module.exports = server
