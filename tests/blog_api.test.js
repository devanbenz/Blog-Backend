const mongoose = require('mongoose')
const Blogs = require('../models/blogs')
const app = require('../app')
const supertest = require('supertest')
const Users = require('../models/users')
const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
      },
]

const initialUsers = [
    {
        username: "root",
        name: "root",
        password: "pass123"
    }
]
describe('testing BLOG functionality',() => {
    beforeEach(async () => {
        await Blogs.deleteMany({})

        const blogObj = initialBlogs
            .map(blog => new Blog(blog))
        const promiseArr = blogObj.map(blog => blog.save())

        await Promise.all(promiseArr)
    })

    test('notes are returned as json', async () => {
        await api.
            get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount of notes', async () => {
        const blogsInDb = await Blogs.find({})
        const blogs = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(blogs.body.length).toEqual(blogsInDb.length)
    })

    test('verify existence of id prop', async () => {
        const blogsInDb = await Blogs.find({})
        expect(blogsInDb.map(x => x.id)).toBeDefined()
    })

    test('blog post req runs', async () => {
        await api 
            .post('/api/blogs')
            .send({
                'title': 'Jest is a testing framework',
                'author':'Devan Benz',
                'url': 'https://google.com',
                'likes': 10
            })
            .expect('Content-Type', /application\/json/)
            .expect(201)

        const blogsInDb = await Blogs.find({})
        expect(blogsInDb.length).toEqual(initialBlogs.length + 1)
    })

    test('blog post defaults to 0 likes', async () => {
        await api 
        .post('/api/blogs')
        .send({
            'title': 'Jest is a testing framework',
            'author':'Devan Benz',
            'url': 'https://google.com'
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsInDb = await Blogs.find({})
        expect(blogsInDb[blogsInDb.length - 1].likes).toEqual(0)
    })

    test('blog has title and url', async () => {
        await api 
        .post('/api/blogs')
        .send({
            'author':'Devan Benz',
            'likes': 2
        })
        .expect(400)
    })

})

describe('testing USER functionality', () =>{
    beforeEach(async () => {
        await Users.deleteMany({})
        
        const userObj = initialUsers
        .map(user => new Users(user))
        const promiseArr = userObj.map(user => user.save())
        
        await Promise.all(promiseArr)
        
    })
    
    test('users are returned as json', async () => {
        await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('user is created', async () => {
        await api
            .post('/api/users')
            .send({
                username: "dbenz",
                name:"devan",
                password: "test123"
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const usersInDb = await Users.find({})
        expect(usersInDb.length).toEqual(initialUsers.length + 1)
    })
    test('cannot create duplicate user', async () => {
        await api
            .post('/api/users')
            .send({
                username: "root",
                name: "root",
                password: "password"
            })
            .expect(401)

    })
    
})

afterAll(() => {
    mongoose.connection.close()
    })