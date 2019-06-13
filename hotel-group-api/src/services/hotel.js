class HotelService {
    constructor() {
      this.collection = "hotel";
      this.mongoDB = new MongoLib();
    }
  
    async getHotels() {
      const hotels = await this.mongoDB.getAll(this.collection, query);
      return hotels || [];
    }
  
    async getHotel({ hotelId }) {
      const hotel = await this.mongoDB.get(this.collection, productId);
      return hotel || {};
    }
  
    async createHotel({ hotel }) {
      const createHotelId = await this.mongoDB.create(this.collection, product);
  
      return createHotelId;
    }
  
    async updateProduct({ hotelId, hotel }) {
      const updateHotelId = await this.mongoDB.update(
        this.collection,
        hotelId,
        hotel
      );
  
      return updateHotelId;
    }
  
    async deleteHotel({ hotelId }) {
      const deletedHotelId = await this.mongoDB.delete(
        this.collection,
        hotelId
      );
  
      return deletedHotelId;
    }
  }
  
  module.exports = HotelService;