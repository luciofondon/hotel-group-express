'use strict'

const setupDatabase = require('./src/repository/db')
const setupHotelModel = require('./src/models/hotel')
const setupRoomModel = require('./src/models/room')
const setupHotel = require('./src/repository/hotel')
const setupRoom = require('./src/repository/room')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const HotelModel = setupHotelModel(config)
  const RoomModel = setupRoomModel(config)

  HotelModel.hasMany(RoomModel)
  RoomModel.belongsTo(HotelModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Hotel = setupHotel(HotelModel)
  const Room = setupRoom(RoomModel, RoomModel)

  return {
    Hotel,
    Room
  }
}
