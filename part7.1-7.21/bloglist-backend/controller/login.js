const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/user')

loginRouter.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const correctPass =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && correctPass)) {
      res
        .status(400)
        .json({ error: 'Please enter a valid username and password' })
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200).send({ token, username: user.username, name: user.name })
  } catch (err) {
    next(err)
  }
})

module.exports = loginRouter
