const express = require('express')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')


// Async await immediately invoked function allows for error catching mongo connection
;(async () => {
    try{
        await mongoose.connect(config.MONGO_URI, {
            useCreateIndex:true,
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        logger.info(`Connected to Mongo DB`)
    }catch(e){
        logger.error(e)
    }
})()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)

module.exports = app
