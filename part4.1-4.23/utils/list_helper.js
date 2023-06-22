const dummy = (blogs) => {
  return 1
}

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Athul',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Athul',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Athul',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const totalLikes = (blogs) => {
  const sum = blogs
    .map((blog) => blog.likes)
    .reduce((sum, like) => sum + like, 0)
  return sum
}

// const authors = blogs.map((blog) => blog.author)

// authorCount = {}

// authors.forEach((author) => {
//   authorCount[author] = (authorCount[author] || 0) + 1
// })
// console.log(authorCount)
// const highest = Math.max(...Object.values(authorCount))

// console.log(highest)

// const ourGuy = Object.keys(authorCount).find(
//   (key) => authorCount[key] === highest
// )

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author)
  const authorCount = {}
  authors.forEach((author) => {
    authorCount[author] = (authorCount[author] || 0) + 1
  })
  const highest = Math.max(...Object.values(authorCount))
  const author = Object.keys(authorCount).find(
    (key) => authorCount[key] === highest
  )
  return [
    {
      author,
      blogs: highest,
    },
  ][0]
}
console.log(mostBlogs(blogs))

// blogs.map((blog) => {
//   authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes
// })
// const highest = Math.max(...Object.values(authorLikes))
// const ourGuy = Object.keys(authorLikes).find(
//   (author) => authorLikes[author] === highest
// )
// console.log(ourGuy)

const mostLikes = (blogs) => {
  const authorLikes = {}
  blogs.map((blog) => {
    authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes
  })
  const highest = Math.max(...Object.values(authorLikes))
  const author = Object.keys(authorLikes).find(
    (author) => authorLikes[author] === highest
  )
  return [{ author, likes: highest }][0]
}

const favouriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const highest = Math.max(...likes)
  return blogs.filter((blog) => blog.likes === highest)[0]
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }
