'use strict'

module.exports = function setupHotel (HotelModel) {
  async function createOrUpdate (hotel) {
    const cond = {
      where: {
        id: hotel.id
      }
    }

    const existingHotel = await HotelModel.findOne(cond)

    if (existingHotel) {
      const updated = await HotelModel.update(hotel, cond)
      return updated ? HotelModel.findOne(cond) : existingHotel
    }

    const result = await HotelModel.create(hotel)
    return result.toJSON()
  }

  async function findById (id) {
    return HotelModel.findOne({
      where: {
        id
      }
    })
  }

  async function findAll () {
    return HotelModel.findAll()
  }

  async function findByName (name) {
    return HotelModel.findAll({
      where: {
        name
      }
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    findByName
  }
}
