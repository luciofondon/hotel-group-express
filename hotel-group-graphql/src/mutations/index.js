'use strict'

// Setup a resolver for every query and mutator defined in the schema
const mutations = {
    createHotel: (root, { input }) => {
        input.id = 1
        return input
    }
}

module.exports = {
    ...mutations
}
