const http = require('http')
const config = require('./utils/config')
const app = require('./app')

http.createServer(app).listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`)
})