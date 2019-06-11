'use strict'

const debug = require('debug')('hotelgroup:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'hotelgroup',
    username: process.env.DB_USER || 'hotelgroup',
    password: process.env.DB_PASS || 'hotelgroup',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    loggin: s => debug(s)
  },
  auth: {
    secret: process.env.SECRET || 'hotelgroup'
  }
}
