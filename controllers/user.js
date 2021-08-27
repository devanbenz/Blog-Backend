const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const Users = require('../models/users')

userRouter.get('/', async (req, res) => {
    try{
        const users = await Users.find({}).populate('blogs', {url: 1,title: 1, author: 1})
        res.status(200).json(users)
    }catch(e){
        res.status(401).json({err: e})
    }
})

userRouter.post('/', async (req, res, next) => {
    const body = req.body
    const saltRounds = 10

    try {
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const newUser = new Users({
            username: body.username,
            name: body.name,
            passwordHash
        })
        const result = await newUser.save()
        res.status(200).json(result)

    }catch (e){
        console.error(e)
        next(e)
    }
})

module.exports = userRouter