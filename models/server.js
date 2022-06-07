const express = require('express')
const cors = require('cors')

class Server{

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        
        //midlewares
        this.midlewares()

        //App routes
        this.routes()
    }

    midlewares() {

        //cors
        this.app.use(cors())

        //directorio pulico
        this.app.use(express.static('public'))

        //lectura y parseo del body
        this.app.use(express.json())
    }

    routes() {
     this.app.use(this.usersPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port)
    }
}

module.exports = Server