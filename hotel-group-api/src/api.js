'use strict'

const debug = require('debug')('hotelgroup:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const aut = require('express-jwt')
const db = require('hotel-group-db')
const config = require('../config/dev.env')
const api = asyncify(express.Router())

let services, Agent, Metric

api.use('*', async (req, res, next) => {
  if(!services){
    try{
      services = await db(config.db)
    } catch(e){
      return next(e)
    }
    Agent = services.Agent
    Metric = services.Metric
  }
  next()
})

api.get('/hotels', auth(config.auth), (req, res) => {
  debug('Request /hotels')
  res.send({})
  // return next(new Error('Hotel not found'))
})

api.get('hotel/:id', (req, res) => {
  const { id } = req.params
  res.send({ id })
})

module.exports = api
