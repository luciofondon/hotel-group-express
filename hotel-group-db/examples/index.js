'use strict'

const db = require('../')

async function run () {
  const config = {
    database: process.env.DB_NAME || 'hotelgroup',
    username: process.env.DB_USER || 'hotelgroup',
    password: process.env.DB_PASS || 'hotelgroup',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }

  const { Hotel, Room } = await db(config).catch(handleFatalError)

  const hotel = await Hotel.createOrUpdate({
    id: 1,
    name: 'Hotel test'
  }).catch(handleFatalError)

  console.log('--hotel--')
  console.log(hotel)

  const hotels = await Hotel.findAll(1).catch(handleFatalError)
  console.log('--hotels--')
  console.log(hotels)

}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()