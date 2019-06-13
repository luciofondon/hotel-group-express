
const BaseService = require('./Base')
const api = require('../../config/api.dev')

class HotelService extends BaseService{
    constructor() {
      super(api.hotel)
    }
  
    async getHotels() {
        let hotels = []
        try {
            hotels = await this.getData()
        } catch (error) {
            console.error(error);
        }
        return hotels;
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