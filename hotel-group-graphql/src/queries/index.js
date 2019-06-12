'use strict'

// Setup a resolver for every query and mutator defined in the schema
const queries = {
  getHotel: ({ root, args }) => {
    return {
        id: args.id,
        name: "String!",
        address: "String",
        stars: 3
      }
  },
  getHotels: () => {
    // throw new Error("msg")
    return [{
      id: 1,
      name: "Hotel",
      address: "Dirección",
      stars: 3
    }]
  }
  
}

module.exports = {
  ...queries
}
