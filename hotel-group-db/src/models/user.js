'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../repository/db')

module.exports = function setupUserModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    }
  })
}
