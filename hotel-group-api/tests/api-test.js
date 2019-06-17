'use strict'

const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const util = require('util')


const hotelFixture = require('./fixtures/hotel')
const config = require('../config/dev.env')
const auth = require('../src/utils/auth')
const sign = util.promisify(auth.sign)

let sandbox = null
let server = null
let dbStub = null
let token = null
let HotelStub = {}
let RoomStub = {}


test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  dbStub = sandbox.stub()
  dbStub.returns(Promise.resolve({
    Hotel: HotelStub,
    Room: RoomStub
  }))


  // Model findAll Stub
  HotelStub.findAll = sandbox.stub()
  HotelStub.findAll.withArgs().returns(Promise.resolve(hotelFixture.all))

  const api = proxyquire('../src/api', {
    'hotelgroup': dbStub
  })

  server = proxyquire('../server', {
    './src/api': api
  })

})

test.serial.cb('/api/hotels', t => {
  request(server)
    .get('/api/hotels')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = JSON.stringify(res.body)
      let expected = JSON.stringify(hotelFixture.all)
      t.deepEqual(body, expected, 'response body should be the expected')
      t.end()
    })
})

test.afterEach(() => {
  sandbox && sinon.restore()
})

test.serial.todo('/api/hotels - not authorized')
test.serial.todo('/api/hotels/1')
