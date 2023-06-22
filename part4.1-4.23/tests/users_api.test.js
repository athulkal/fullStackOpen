const mongoose = require('mongoose')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

mongoose.set('bufferTimeoutMS', 30000)

beforeEach(async () => {
  await User.deleteMany({})
  const saltRounds = 10
  const user = {
    username: 'root',
    name: 'athul',
    passwordHash: await bcrypt.hash('secret', saltRounds),
  }
  const newUser = new User(user)
  console.log('/// new user ///', newUser)
  await newUser.save()
}, 100000)

describe('on creating a user', () => {
  test('check whether username and password is entered', async () => {
    const newUser = {
      name: 'verona',
    }
    console.log(newUser)
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('if the username is not unique responds with 400 bad request', async () => {
    const newUser = {
      username: 'root',
      name: 'Arturo',
      password: 'hola123',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('expected `username` to be unique')
  })
})

test('check if username and password is not atleast 3 characters long and if not responds with 400 bad request', async () => {
  const newUser = {
    username: 'r',
    name: 'Arturo',
    password: 'eeee',
  }
  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  expect(
    result.body.error ===
      'password is required and to be of atleast 3 characters long.' ||
      result.body.error === 'shorter than the minimum allowed length (3).'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})
