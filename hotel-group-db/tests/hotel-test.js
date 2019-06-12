'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
  loggin: function () {}
}

let RoomStub = {
  belongsTo: sinon.spy()
}

let HotelStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  HotelStub = {
    hasMany: sandbox.spy()
  }

  const setupDatbase = proxyquire('../', {
    './models/hotel': () => HotelStub,
    './models/room': () => RoomStub
  })

  db = await setupDatbase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('Hotel', t => {
  t.truthy(db.Hotel, 'Hotel service should exist')
})

test.serial('Setup', t => {
  t.true(HotelStub.hasMany.called, 'HotelModel.hasMany was executed')
  t.true(HotelStub.hasMany.calledWith(RoomStub), 'Argument should be the HotelModel')
  t.true(RoomStub.belongsTo.called, 'HotelModel.belongsTo was executed')
  t.true(RoomStub.hasMany.calledWith(HotelStub), 'Argument should be the RoomModel')
})
