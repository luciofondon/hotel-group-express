'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const hotelFixtures = require('./fixtures/hotel')

let config = {
  logging () {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}

let id = 1
let uuid = 'yyy-yyy-yyy'
let HotelStub = null
let db = null
let sandbox = null

let single = Object.assign({}, hotelFixtures.single)

let connectedArgs = {
  where: { connected: true }
}

let usernameArgs = {
  where: { username: 'hotelgroup', connected: true }
}

let uuidArgs = {
  where: { uuid }
}

let newHotel = {
  name: 'Hotel Mallorca',
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  HotelStub = {
    hasMany: sandbox.spy()
  }

    // Model create Stub
    HotelStub.create = sandbox.stub()
    HotelStub.create.withArgs(newAgent).returns(Promise.resolve({
        toJSON () { return newAgent }
    }))

  // Model update Stub
  HotelStub.update = sandbox.stub()
  HotelStub.update.withArgs(single, uuidArgs).returns(Promise.resolve(single))

  // Model findById Stub
  HotelStub.findById = sandbox.stub()
  HotelStub.findById.withArgs(id).returns(Promise.resolve(agentFixtures.byId(id)))

  // Model findOne Stub
  HotelStub.findOne = sandbox.stub()
  HotelStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(agentFixtures.byUuid(uuid)))

  // Model findAll Stub
  HotelStub.findAll = sandbox.stub()
  AgentStub.findAll.withArgs().returns(Promise.resolve(agentFixtures.all))
  HotelStub.findAll.withArgs(connectedArgs).returns(Promise.resolve(agentFixtures.connected))
  AgentStub.findAll.withArgs(usernameArgs).returns(Promise.resolve(agentFixtures.platzi))

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('Hotel', t => {
  t.truthy(db.Hotel, 'Agent service should exist')
})

test.serial('Setup', t => {
  t.true(HotelStub.hasMany.called, 'AgentModel.hasMany was executed')
  t.true(HotelStub.hasMany.calledWith(RoomStub), 'Argument should be the RoomModel')
  t.true(RoomStub.belongsTo.called, 'MetricModel.belongsTo was executed')
  t.true(RoomStub.belongsTo.calledWith(HotelStub), 'Argument should be the HotelModel')
})

test.serial('Agent#findById', async t => {
  let agent = await db.Agent.findById(id)

  t.true(AgentStub.findById.called, 'findById should be called on model')
  t.true(AgentStub.findById.calledOnce, 'findById should be called once')
  t.true(AgentStub.findById.calledWith(id), 'findById should be called with specified id')

  t.deepEqual(agent, agentFixtures.byId(id), 'should be the same')
})

test.serial('Agent#findByUuid', async t => {
  let agent = await db.Agent.findByUuid(uuid)

  t.true(HotelStub.findOne.called, 'findOne should be called on model')
  t.true(HotelStub.findOne.calledOnce, 'findOne should be called once')
  t.true(HotelStub.findOne.calledWith(uuidArgs), 'findOne should be called with uuid args')

  t.deepEqual(agent, agentFixtures.byUuid(uuid), 'agent should be the same')
})

test.serial('Agent#findAll', async t => {
  let agents = await db.Agent.findAll()

  t.true(HotelStub.findAll.called, 'findAll should be called on model')
  t.true(HotelStub.findAll.calledOnce, 'findAll should be called once')
  t.true(HotelStub.findAll.calledWith(), 'findAll should be called without args')

  t.is(agents.length, agentFixtures.all.length, 'agents should be the same amount')
  t.deepEqual(agents, agentFixtures.all, 'agents should be the same')
})

test.serial('Agent#findConnected', async t => {
  let agents = await db.Agent.findConnected()

  t.true(HotelStub.findAll.called, 'findAll should be called on model')
  t.true(HotelStub.findAll.calledOnce, 'findAll should be called once')
  t.true(HotelStub.findAll.calledWith(connectedArgs), 'findAll should be called with connected args')

  t.is(agents.length, agentFixtures.connected.length, 'agents should be the same amount')
  t.deepEqual(agents, agentFixtures.connected, 'agents should be the same')
})

test.serial('Agent#findByUsername', async t => {
  let agents = await db.Agent.findByUsername('platzi')

  t.true(HotelStub.findAll.called, 'findAll should be called on model')
  t.true(HotelStub.findAll.calledOnce, 'findAll should be called once')
  t.true(HotelStub.findAll.calledWith(usernameArgs), 'findAll should be called with username args')

  t.is(agents.length, agentFixtures.platzi.length, 'agents should be the same amount')
  t.deepEqual(agents, agentFixtures.platzi, 'agents should be the same')
})

test.serial('Hotel#createOrUpdate - exists', async t => {
  let hotel = await db.Hotel.createOrUpdate(single)

  t.true(HotelStub.findOne.called, 'findOne should be called on model')
  t.true(HotelStub.findOne.calledTwice, 'findOne should be called twice')
  t.true(HotelStub.findOne.calledWith(uuidArgs), 'findOne should be called with uuid args')
  t.true(HotelStub.update.called, 'hotel.update called on model')
  t.true(HotelStub.update.calledOnce, 'hotel.update should be called once')
  t.true(HotelStub.update.calledWith(single), 'hotel.update should be called with specified args')

  t.deepEqual(agent, single, 'agent should be the same')
})

test.serial('Hotel#createOrUpdate - new', async t => {
  let hotel = await db.Agent.createOrUpdate(newAgent)

  t.true(HotelStub.findOne.called, 'findOne should be called on model')
  t.true(HotelStub.findOne.calledOnce, 'findOne should be called once')
  t.true(HotelStub.findOne.calledWith({
    where: { uuid: newAgent.uuid }
  }), 'findOne should be called with uuid args')
  t.true(HotelStub.create.called, 'create should be called on model')
  t.true(HotelStub.create.calledOnce, 'create should be called once')
  t.true(HotelStub.create.calledWith(newHotel), 'create should be called with specified args')

  t.deepEqual(hotel, newHotel, 'agent should be the same')
})