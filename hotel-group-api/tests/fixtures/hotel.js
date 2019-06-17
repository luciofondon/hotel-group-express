'use strict'

const hotel = {
    id: 1,
    name: "Hotel Balear",
    stars: 4,
    createdAt: new Date(),
    updatedAt: new Date()
}

const hotels = [
    hotel,
    extend(hotel, {id: 2, name: "Hotel Palma"}),
    extend(hotel, {id: 2, name: "Hotel Manacor"}),
    extend(hotel, {id: 2, name: "Hotel Inca", stars: 5})
]

function extend (obj, values){
    const clone = Object.assign({}, obj)
    return Object.assign(clone, values)
}

module.exports = {
    single: hotel,
    all: hotels,
    starsFive: hotels.filter(a => a.stars === 5),
    byId: id => hotels.filter(a => a.id == id).shift()
}