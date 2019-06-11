'use strict'

const debug = require('debug')('hotelgroup:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('platziverse-db')

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
    const agent = clients.get(client.id)
  
    if (agent) {
      // Mark Agent as Disconnected
      agent.connected = false
  
      try {
        await Agent.createOrUpdate(agent)
      } catch (e) {
        return handleError(e)
      }
  
      // Delete Agent from Clients List
      clients.delete(client.id)
  
      server.publish({
        topic: 'agent/disconnected',
        payload: JSON.stringify({
          agent: {
            uuid: agent.uuid
          }
        })
      })
      debug(`Client (${client.id}) associated to Agent (${agent.uuid}) marked as disconnected`)
    }
})
  
server.on('published', async (packet, client) => {
    debug(`Received: ${packet.topic}`)
  
    switch (packet.topic) {
      case 'room/connected':
      case 'room/disconnected':
        debug(`Payload: ${packet.payload}`)
        break
      case 'room/message':
        debug(`Payload: ${packet.payload}`)
  
        const payload = parsePayload(packet.payload)
  
        if (payload) {
          payload.agent.connected = true
  
          let agent
          try {
            agent = await Agent.createOrUpdate(payload.agent)
          } catch (e) {
            return handleError(e)
          }
  
          debug(`Room ${room.id} saved`)
  
          // Notify Room is Connected
          if (!clients.get(client.id)) {
            clients.set(client.id, agent)
            server.publish({
              topic: 'room/connected',
              payload: JSON.stringify({
                room: {
                  name: room.name,
                }
              })
            })
          }
  
          // Store Rooms
          for (let room of payload.rooms) {
            let m
  
            try {
              m = await Metric.create(agent.uuid, metric)
            } catch (e) {
              return handleError(e)
            }
  
            debug(`Room ${m.id} saved on agent ${room.id}`)
          }
        }
        break
    }
  })

  

server.on('ready', () => {
    console.log(`${chalk.green('[platziverse-mqtt]')} server is running`)
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
