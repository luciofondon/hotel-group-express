'use strict'


module.exports = {
    config: (setup, loggin) = {
        database: process.env.DB_NAME || 'hotelgroup',
        username: process.env.DB_USER || 'hotelgroup',
        password: process.env.DB_PASS || 'hotelgroup',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging,
        setup
      }
}