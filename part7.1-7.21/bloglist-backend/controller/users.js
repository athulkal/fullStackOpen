const User = require('../model/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1,
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

userRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body
    const saltRounds = 10
    const passwordHash =
      password && password.length >= 3
        ? await bcrypt.hash(password, saltRounds)
        : null

    if (!passwordHash) {
      return res.status(400).json({
        error: 'password is required and to be of atleast 3 characters long.',
      })
    }

    const newUser = {
      username,
      name,
      passwordHash,
    }
    console.log(newUser)

    const userCreated = await User.create(newUser)
    res.status(201).json(userCreated)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// userRouter.delete('/', async (req, res) => {
//   try {
//     await User.deleteMany({})
//     res.status(204).end()
//   } catch (err) {
//     console.log(err)
//   }
// })

module.exports = userRouter
