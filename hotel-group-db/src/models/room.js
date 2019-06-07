'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupRoomModel (config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('room', {
        type: {
        type: Sequelize.STRING,
        allowNull: false
        },
        value: {
        type: Sequelize.TEXT,
        allowNull: false
        }
    })
}
