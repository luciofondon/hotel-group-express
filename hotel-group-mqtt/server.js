'use strict'

const debug = require('debug')('hotelgroup:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('hotel-group-db')

const { parsePayload } = require('./src/utils')

const backend = {
    type: 'redis',
    redis,
    return_buffers: true
}

const settings = {
    port: 1883,
    backend
}

const config = {
    database: process.env.DB_NAME || 'hotelgroup',
    username: process.env.DB_USER || 'hotelgroup',
    password: process.env.DB_PASS || 'hotelgroup',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s)
  }
  

const server = new mosca.Server(settings)
const clients = new Map()

let Hotel, Room

server.on('clientConnected', client => {
    debug(`Client Connected: ${client.id}`)
    clients.set(client.id, null)
})
  
server.on('clientDisconnected', async (client) => {
    debug(`Client Disconnected: ${client.id}`)
    const hotel = clients.get(client.id)
  
    if (hotel) {
      // Mark Hotel as Disconnected
      hotel.connected = false
  
      try {
        await Hotel.createOrUpdate(hotel)
      } catch (e) {
        return handleError(e)
      }
  
      // Delete Agent from Clients List
      clients.delete(client.id)
  
      server.publish({
        topic: 'hotel/disconnected',
        payload: JSON.stringify({
          hotel: {
            id: hotel.id
          }
        })
      })
      debug(`Client (${client.id}) associated to Hotel (${hotel.id}) marked as disconnected`)
    }
})
  
server.on('published', async (packet, client) => {
    debug(`Received: ${packet.topic}`)
  
    switch (packet.topic) {
      case 'hotel/connected':
      case 'hotel/disconnected':
        debug(`Payload: ${packet.payload}`)
        break
      case 'hotel/message':
        debug(`Payload: ${packet.payload}`)
  
        const payload = parsePayload(packet.payload)
  
        if (payload) {
          payload.agent.connected = true
  
          let agent
          try {
            agent = await Hotel.createOrUpdate(payload.agent)
          } catch (e) {
            return handleError(e)
          }
  
          debug(`Hotel ${hotel.id} saved`)
  
          // Notify Room is Connected
          if (!clients.get(client.id)) {
            clients.set(client.id, agent)
            server.publish({
              topic: 'hotel/connected',
              payload: JSON.stringify({
                hotel: {
                  name: hotel.name,
                }
              })
            })
          }
        }
        break
    }
  })

server.on('ready', async () => {
  const services = await db(config).catch(handleFatalError)

  Hotel = services.Hotel
  Room = services.Room

  console.log(`${chalk.green('[hotelgroup-mqtt]')} server is running`)
})

server.on('error', handleFatalError)

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

function handleError (err) {
  console.error(`${chalk.red('[error]')} ${err.message}`)
  console.error(err.stack)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
