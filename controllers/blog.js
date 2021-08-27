const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response, next) => {
    try{
      const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
      response.json(blogs)
    }catch(e){
      next(e)
    }
  })
  
blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user
  try{
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user
      })
      
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      
      await user.save()
      response.status(201).json({sent:'sent'})

    }catch(e){
      next(e)
    }
  })

blogRouter.delete('/:id', async (req, res, next) => { 
    const user = req.user
    try{
        if(Boolean(user.blogs.find(x => req.params.id.toString()))){
          await Blog.findByIdAndDelete(req.params.id)
          res.status(200).json({msg: 'Deleted db item'})
        }
    }catch(e){
        next(e)
    }    
})

blogRouter.put('/:id', async (req, res, next) => { 
    try{
        await Blog.findByIdAndUpdate(
            req.params.id,{likes: req.body.likes}
        )
        res.status(201).json({msg:'updated likes'})
    }catch(e){
        next(e)
    }
})

module.exports = blogRouter
  