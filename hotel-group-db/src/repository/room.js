'use strict'

module.exports = function setupRoom (RoomModel, AgentModel) {
  function findAll () {
    return HotelModel.findAll()
  }
  return {
    findAll
  }
}
