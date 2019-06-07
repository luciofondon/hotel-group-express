'use strict'

const test = require('ava')
const request = require('supertest')
const server = require('../hotel-group-api/server')

test.serial.cb('/api/hotels', t => {
    request(server)
        .get('/api/hotels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            t.falsy(err, 'should not return an error')
            let body = req.body;
            t.deepEqual(body, {}, 'response body should be the expected')
            t.end()
        })
})