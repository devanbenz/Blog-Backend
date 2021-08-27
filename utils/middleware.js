const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if(error.name === 'ValidationError'){
        return res.status(401).json({err: 'Validation Error'})
    }else if(error.name === 'JsonWebTokenError'){
        return res.status(401).json({err: 'Invalid token'})
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const header = req.headers.authorization
    if(header !== undefined && header.startsWith('bearer ')) {
      req.token = header.substring(7)
    }
    next()
}

const userExtractor = async (req, res, next) => {
    const tokenDecoder = jwt.verify(req.token, process.env.SECRET) 
    req.user = await Users.findById(tokenDecoder.token) 
    next()
}

module.exports = {
    tokenExtractor,
    errorHandler,
    userExtractor
}