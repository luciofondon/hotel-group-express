'use strict'

const setupDatabase = require('./lib/db')
const setupHotelModel = require('./models/hotel')
const setupRoomModel = require('./models/room')
const setupHotel = require('./lib/hotel')
const setupRoom = require('./lib/room')
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

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = setupAgent(AgentModel)
  const Metric = setupMetric(MetricModel, AgentModel)

  return {
    Hotel,
    Room
  }
}