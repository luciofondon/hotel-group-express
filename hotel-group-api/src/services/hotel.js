'use strict'

const config = require('../../config/dev.env')
const db = require('hotel-group-db')

let services, Hotel

class HotelService{
    constructor() {
    }
  
    async getHotels() {
      try {
        services = await db(config.db)
      } catch (e) {
        throw new Error(e)
      }
      Hotel = services.Hotel
      return await Hotel.findAll()
    }
  
    async getHotel(hotelId) {
      let hotels = {}
      try {
          hotels = await this.getData(hotelId)
      } catch (error) {
          console.error(error);
      }
      return hotels;
    }
  
    async addHotel(hotel) {
      let hotel = {}
      try {
        hotel = await this.addData(hotel)
      } catch (error) {
          console.error(error);
      }
      return hotel;
    }
  
    async updateProduct(hotelId, hotel) {
      let hotel = {}
      try {
        hotel = await this.updateData(hotelId)
      } catch (error) {
          console.error(error);
      }
      return hotel;
    }
  
    async removeHotel(hotelId) {
      let hotel = {}
      try {
        hotel = await this.removeData(hotelId)
      } catch (error) {
          console.error(error);
      }
      return hotel;
    }
  }
  
  module.exports = HotelService;