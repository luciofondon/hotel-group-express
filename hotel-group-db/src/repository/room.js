'use strict'

module.exports = function setupRoom (RoomModel, HotelModel) {
  function findAll () {
    return RoomModel.findAll()
  }
  return {
    findAll
  }
}
