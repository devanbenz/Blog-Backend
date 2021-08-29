const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Users = require('../models/users')

loginRouter.post('', async (req, res) => {
    const body = req.body
    try{
        const user = await Users.findOne({username: body.username})
        const pass = await bcrypt.compare(body.password, user.passwordHash)
        if(!user || !pass) { 
            return res.status(401).json({err:'username/password invalid'})
        }else {
            const token = jwt.sign({token:`${user._id}`}, process.env.SECRET)
            return res.status(200).json({username: user.username, name: user.name, token})
        }
    }catch(e){
        console.log(e)
        res.status(401).json({err:e})
    }
    
})

module.exports = loginRouter