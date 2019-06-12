'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express');
const cors = require('cors')
const gqlMiddleware = require('express-graphql');
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./src/resolvers')

const app = express();
const isDev = process.env.NODE_ENV !== 'production'

const typeDefs =  readFileSync(
    join(__dirname, 'src', 'schemas', 'schema.graphql'),
    'utf-8'
)

const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors())
app.use('/api', gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: isDev
}))

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}/api`)
})