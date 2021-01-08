const express = require('express')
const server = express()
const { mongoose } = require('./database')
const cors = require('cors')

server.set('port', process.env.PORT || 3001)

server.use(cors())
server.use(express.json())

server.use('/v1/service', require('./routes/v1/service.routes'))
server.use('/v1/user', require('./routes/v1/user.routes'))

server.listen(server.get('port'), ()=>{
    console.log(`Server listen on port :${server.get('port')}`)
})