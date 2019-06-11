'use strict'

const hotel = {
  id: 1,
  name: "Hotel Mallorca",
  createdAt: new Date(),
  updatedAt: new Date()
}

const hotels = [
  hotel,
  extend(hotel, { id: 2, uuid: 'yyy-yyy-yyw', connected: false, username: 'test' }),
  extend(hotel, { id: 3, uuid: 'yyy-yyy-yyx' }),
  extend(hotel, { id: 4, uuid: 'yyy-yyy-yyz', username: 'test' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: agent,
  all: agents,
  connected: agents.filter(a => a.connected),
  hotelgroup: agents.filter(a => a.username === 'hotelgroup'),
  byUuid: id => agents.filter(a => a.uuid === id).shift(),
  byId: id => agents.filter(a => a.id === id).shift()
}