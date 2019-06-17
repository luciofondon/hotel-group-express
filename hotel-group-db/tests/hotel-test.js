'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const hotelFixture = require('./fixtures/hotel')

let config = {
  logging: function () {}
}

let RoomStub = {
  belongsTo: sinon.spy()
}

let single = Object.assign({}, hotelFixture.single)
let id = 1
let idArgs = {
  where: { id }
}
let newHotel = {
  id: '4',
  name: 'Hotel Caceres',
  stars: 3,
}

let HotelStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  HotelStub = {
    hasMany: sandbox.spy()
  }

  // Model findById Stub
  HotelStub.findById = sandbox.stub()
  HotelStub.findById.withArgs(id).returns(Promise.resolve(hotelFixture.byId(id)))

  // Model findOne Stub
  HotelStub.findOne = sandbox.stub()
  HotelStub.findOne.withArgs(idArgs).returns(Promise.resolve(hotelFixture.byId(id)))

  // Model findAll Stub
  HotelStub.findAll = sandbox.stub()
  HotelStub.findAll.withArgs().returns(Promise.resolve(hotelFixture.all))

  // Model create Stub
  HotelStub.create = sandbox.stub()
  HotelStub.create.withArgs(newHotel).returns(Promise.resolve({
    toJSON () { return newHotel }
  }))

  // Model update Stub
  HotelStub.update = sandbox.stub()
  HotelStub.update.withArgs(single, idArgs).returns(Promise.resolve(single))
    
  const setupDatbase = proxyquire('../', {
    './src/models/hotel': () => HotelStub,
    './src/models/room': () => RoomStub
  })

  db = await setupDatbase(config)
})

test.afterEach(() => {
  sandbox && sinon.restore()
})

test('Hotel', t => {
  t.truthy(db.Hotel, 'Hotel service should exist')
})

test.serial('Setup', t => {
  t.true(HotelStub.hasMany.called, 'HotelModel.hasMany was executed')
  t.true(HotelStub.hasMany.calledWith(RoomStub), 'Argument should be the HotelModel')
  t.true(RoomStub.belongsTo.called, 'HotelModel.belongsTo was executed')
  t.true(RoomStub.belongsTo.calledWith(HotelStub), 'Argument should be the RoomModel')
})

test.serial('Hotel#findById', async t => {
  let hotel = await db.Hotel.findById(id)

  t.true(HotelStub.findById.called, 'findById should be called on model')
  t.true(HotelStub.findById.calledOnce, 'findById should be called once')
  t.true(HotelStub.findById.calledWith(id), 'findById should be called with specified id')

  t.deepEqual(hotel, hotelFixture.byId(id), 'should be the same')
})

test.serial('Hotel#findAll', async t => {
  let hotels = await db.Hotel.findAll()

  t.true(HotelStub.findAll.called, 'findAll should be called on model')
  t.true(HotelStub.findAll.calledOnce, 'findAll should be called once')
  t.true(HotelStub.findAll.calledWith(), 'findAll should be called without args')

  t.is(hotels.length, hotelFixture.all.length, 'hotels should be the same amount')
  t.deepEqual(hotels, hotelFixture.all, 'hotels should be the same')
})

test.serial('Hotel#createOrUpdate - exists', async t => {
  let hotel = await db.Hotel.createOrUpdate(single)

  t.true(HotelStub.findOne.called, 'findOne should be called on model')
  t.true(HotelStub.findOne.calledTwice, 'findOne should be called twice')
  t.true(HotelStub.findOne.calledWith(idArgs), 'findOne should be called with id args')
  t.true(HotelStub.update.called, 'hotel.update called on model')
  t.true(HotelStub.update.calledOnce, 'hotel.update should be called once')
  t.true(HotelStub.update.calledWith(single), 'hotel.update should be called with specified args')

  t.deepEqual(hotel, single, 'hotel should be the same')
})

test.serial('Hotel#createOrUpdate - new', async t => {
  let hotel = await db.Hotel.createOrUpdate(newHotel)

  t.true(HotelStub.findOne.called, 'findOne should be called on model')
  t.true(HotelStub.findOne.calledOnce, 'findOne should be called once')
  t.true(HotelStub.findOne.calledWith({
    where: { id: newHotel.id }
  }), 'findOne should be called with uuid args')
  t.true(HotelStub.create.called, 'create should be called on model')
  t.true(HotelStub.create.calledOnce, 'create should be called once')
  t.true(HotelStub.create.calledWith(newHotel), 'create should be called with specified args')

  t.deepEqual(hotel, newHotel, 'agent should be the same')
})