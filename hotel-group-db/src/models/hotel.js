'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../repository/db')

module.exports = function setupHotelModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('hotel', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    stars: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    }

  })
}
