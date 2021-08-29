const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if(error.name === 'ValidationError'){
        return res.status(401).json({err: 'Validation Error'})
    }else if(error.name === 'JsonWebTokenError'){
        return res.status(401).json({err: 'Invalid token'})
    }else if(error.name === 'TypeError'){
        return res.status(401).json({err: error.message})
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    try{
        const header = req.headers.authorization
        if(header !== undefined && header.startsWith('bearer ')) {
          req.token = header.substring(7)
        }
        next()
    }catch(e){
        next(e)
    }
}

const userExtractor = async (req, res, next) => {
    try{
        if(req.token){
            const tokenDecoder = jwt.verify(req.token, process.env.SECRET) 
            req.user = await Users.findById(tokenDecoder.token) 
        }
        next()
    }catch(e){
        next(e)
    }
}

module.exports = {
    tokenExtractor,
    errorHandler,
    userExtractor
}