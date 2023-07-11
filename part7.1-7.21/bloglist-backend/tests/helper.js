const User = require('../model/user')

const initialBlog = [
  {
    title: 'Css is hard',
    author: 'Random joby',
    url: 'www.example.com',
    likes: 10,
  },
  {
    title: 'Html is easy',
    author: 'Random Ricky',
    url: 'www.example2.com',
    likes: 20,
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = { initialBlog, usersInDb }
