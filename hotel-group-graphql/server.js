const express = require('express');
const bodyParser = require('body-parser');
const { grapqlExpress, graphiqlExpress } = require('graphql-server-express')
const schema = require('./src/schemas')

const app = express();

app.use('/graphql', bodyParser.json(), grapqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

const PORT = 7000;
app.listen(PORT, () => {
    console.log("Servidor arrancado!!!")
})