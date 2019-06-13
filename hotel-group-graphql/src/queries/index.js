'use strict'
const config = require('../../config/dev.env')
const db = require('hotel-group-db')
let services, Hotel
// Setup a resolver for every query and mutator defined in the schema
const queries = {
  getHotel: async ({ root, args }) => {
    try {
      services = await db(config.db)
    } catch (e) {
      throw new Error(e)
    }
    Hotel = services.Hotel
    return await Hotel.findById(args.id)
  },
  getHotels: async () => {
    try {
      services = await db(config.db)
    } catch (e) {
      throw new Error(e)
    }
    Hotel = services.Hotel
    return await Hotel.findAll()
  }
  
}

module.exports = {
  ...queries
}
