const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../model/blog')
const User = require('../model/user')
const helper = require('./helper')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const api = supertest(app)

mongoose.set('bufferTimeoutMS', 30000)
// before each test initialising the blogs in database
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObject = helper.initialBlog.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
}, 100000)
/// before each test initialising a user in database
beforeEach(async () => {
  await User.deleteMany({})
  const saltRounds = 10
  const user = {
    username: 'root',
    name: 'athul',
    passwordHash: await bcrypt.hash('secret', saltRounds),
  }
  const newUser = new User(user)
  await newUser.save()
}, 100000)

describe('when there are blogs initially saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('verify the unique identifier property of a blog is named as id', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const id = result.body.data.map((result) => result.id)
    expect(id[0]).toBeDefined()
  }, 100000)
})

describe('on creating a new blog', () => {
  let token = undefined

  ////fails with 401 unauthorized if there is no token
  test('adding a blog fails with status code 401 if there is no token', async () => {
    const newBlog = {
      title: 'Css is hard',
      author: 'Random joby',
      url: 'www.example2.com',
      likes: 10,
    }
    const result = await api.post('/api/blogs').send(newBlog).expect(401)
    expect(result.body.error).toEqual('Please provide token')
  })

  test('HTTP post request creates a successful blog', async () => {
    const user = {
      username: 'root',
      password: 'secret',
    }
    const resultUser = await api.post('/api/login').send(user).expect(200)
    token = resultUser.body.token

    const newBlog = {
      title: 'Css is hard',
      author: 'Random joby',
      url: 'www.example2.com',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const result = await api.get('/api/blogs')
    const content = result.body.data.map((blog) => blog)
    expect(result.body.data).toHaveLength(helper.initialBlog.length + 1)
    expect(Object.keys(content[content.length - 1])).toEqual([
      'title',
      'author',
      'url',
      'likes',
      'user',
      'id',
    ])
  }, 100000)
  //test to check if the likes property is missing
  test('check if likes property is missing if it is then it deafults to 0', async () => {
    const user = {
      username: 'root',
      password: 'secret',
    }
    const resultUser = await api.post('/api/login').send(user).expect(200)
    token = resultUser.body.token

    const newBlog = {
      title: 'Css is hard',
      author: 'Random joby',
      url: 'www.example2.com',
    }
    console.log('token check from likes', token)
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
    const result = await api.get('/api/blogs')
    const newBlogObj = result.body.data[helper.initialBlog.length]
    expect(newBlogObj).toHaveProperty('likes', 0)
  }, 100000)

  //blog without a title and url
  test('Check whether a blog without title and url returns a 400 bad request', async () => {
    const user = {
      username: 'root',
      password: 'secret',
    }
    const resultUser = await api.post('/api/login').send(user).expect(200)
    token = resultUser.body.token
    console.log('token from 400 bad', token)
    const newBlog = {
      author: 'Random joby',
      likes: 10,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})
describe('on updating a blog', () => {
  test('on a succesful updation of blog', async () => {
    const updatingNote = {
      title: 'node js',
      author: 'Unknown',
      url: 'www.node.js',
      likes: 100,
    }
    const request = await api.get('/api/blogs')
    const blogToUpdate = request.body.data[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatingNote)
      .expect(201)
    const notesAtEnd = await (await api.get('/api/blogs')).body.data
    expect(Object.values(notesAtEnd[0])).toEqual([
      'node js',
      'Unknown',
      'www.node.js',
      100,
      blogToUpdate.id,
    ])
    expect(notesAtEnd).toHaveLength(helper.initialBlog.length)
  })
})

describe('on deleting a blog', () => {
  // on deleting a blog done using insertion in the same test
  let token = ''
  test('checks whether a blog is deleted successfully', async () => {
    const user = {
      username: 'root',
      password: 'secret',
    }
    const resultUser = await api.post('/api/login').send(user).expect(200)
    token = resultUser.body.token
    // there exists only user in the database
    const userForId = await api.get('/api/users').expect(200)
    // creating that blog with the user
    const blog = {
      title: 'test blog',
      url: 'www.test.com',
      author: 'sebastian',
      user: userForId.body.id,
    }

    const newBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)

    /// deleting the blog
    await api
      .delete(`/api/blogs/${newBlog.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    const blogsAtEnd = await (await api.get('/api/blogs')).body.data
    console.log(blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
