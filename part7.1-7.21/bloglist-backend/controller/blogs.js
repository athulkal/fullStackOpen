const blogsRouter = require('express').Router()
const Blog = require('../model/blog')
const User = require('../model/user')
const middlewares = require('../utils/middleware')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    console.log('get all blogs: ==>', blogs.length)
    res.status(200).json({
      status: 'success',
      data: blogs,
    })
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/', middlewares.userExtractor, async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body

    if (!req.user._id) {
      return res.status(401).json({ error: 'Token invalid' })
    }
    const user = req.user

    const newBlogData = {
      title,
      url,
      author,
      likes,
      user: user.id,
    }
    console.log(user)
    let blog = await Blog.create(newBlogData)
    blog = await blog.populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    console.log(blog)
    user.blogs = user.blogs.concat(blog.id)
    await user.save()
    res.status(201).json({
      status: 'success',
      data: blog,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      res.status(400).json({ error: 'requested blog does not exist' })
    }
    const user = await User.findById(blog.user.toString())
    console.log(user)
    console.log(blog.user.toString() === user.id)
    res.status(200).json(blog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  console.log('blogsRouter', request.body)
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: request.body.comment } },
    { new: true }
  )
  response.json(updatedBlog).status(200).end()
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const blog = {
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
    }
    let updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
      runValidators: true,
    })
    await updatedBlog.populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    res.status(201).json(updatedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete(
  '/:id',
  middlewares.userExtractor,
  async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id)
      const userId = blog.user.toString()
      const user = await User.findById(userId)
      //verifying if the user of the blog post and logged in user is the same
      if (user.id === req.user._id.toString()) {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
      } else {
        res
          .status(400)
          .json({ error: 'Only the user who created the blog can delete it.' })
      }
    } catch (err) {
      next(err)
    }
  }
)

module.exports = blogsRouter
