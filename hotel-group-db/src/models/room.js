'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../repository/db')

module.exports = function setupRoomModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('room', {
    number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    checkin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    doubleBed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    cleaning: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  })
}
