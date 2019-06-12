'use strict'

const debug = require('debug')('hotelgroup:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const auth = require('express-jwt')
const db = require('hotel-group-db')
const config = require('../config/dev.env')
const api = asyncify(express.Router())

let services, Hotel

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }
    Hotel = services.Hotel
  }
  next()
})

api.get('/hotels', (req, res) => {
  debug('Request /hotels')
  res.send(Hotel.findAll())
  // return next(new Error('Hotel not found'))
})

api.get('hotel/:id', (req, res) => {
  const { id } = req.params
  res.send({ id })
})

api.post('/hotels', (req, res) => {
  debug('Request /hotels')
  res.send(Hotel.findAll())
  // return next(new Error('Hotel not found'))
})


api.put('/hotel/:id', (req, res) => {
  debug('Request /hotels')
  res.send(Hotel.findAll())
  // return next(new Error('Hotel not found'))
})

api.delete('/hotel/:id', (req, res) => {
  debug('Request /hotels')
  res.send(Hotel.findAll())
  // return next(new Error('Hotel not found'))
})


module.exports = api
