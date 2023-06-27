const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controller/blogs')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const middlewares = require('./utils/middleware')

const app = express()

const connection = async () => {
  try {
    mongoose.connect(config.MONGO_URL)
    console.log('Connected to DB')
  } catch (err) {
    console.log(err)
  }
}
connection()

app.use(cors())
app.use(express.json())

app.use(middlewares.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controller/testing')
  app.use('/api/test', testingRouter)
}

app.use(middlewares.errorHandler)

module.exports = app
