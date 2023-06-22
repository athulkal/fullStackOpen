const User = require('../model/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    req.token = token
  }
  next()
}
const userExtractor = async (req, res, next) => {
  console.log('hello from middleware', req.token)
  if (!req.token) {
    res.status(401).json({ error: 'Please provide token' })
    return next()
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    res.status(401).json({ error: 'jwt inavlid' })
  } else {
    const user = await User.findById(decodedToken.id)
    req.user = user
  }

  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }
