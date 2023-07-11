import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [color, setColor] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userLoggedJSON = window.localStorage.getItem('loggedInUser')
    if (userLoggedJSON) {
      const user = JSON.parse(userLoggedJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      console.log(user)
      setNotification(`${user.name} logged in successfully`)
      setColor('green')
      setTimeout(() => {
        setColor('')
        setNotification(null)
      }, 3000)
    } catch (err) {
      setUsername('')
      setPassword('')
      setNotification(err.response.data.error)
      setColor('red')
      setTimeout(() => {
        setNotification(null)
        setColor('')
      }, 3000)
    }
  }

  const createBlogHandler = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(newBlog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`)
      setColor('green')
      setTimeout(() => {
        setNotification(null)
        setColor('')
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const addLikesHandler = (id, updatingBlog) => {
    blogService.update(id, updatingBlog).then((res) => {
      console.log(res.data)
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === id) {
            return { ...blog, likes: blog.likes + 1 }
          } else {
            return blogs
          }
        })
      )
    })
  }

  const removeBlogHandler = async (id) => {
    try {
      await blogService.remove(id)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    } catch (err) {
      setNotification(err.response.data.error)
      setColor('red')
      setTimeout(() => {
        setNotification(null)
        setColor('')
      }, 3000)
    }
  }

  const sortedBlogs = blogs.sort((a, b) =>
    a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0
  )

  if (user === null) {
    return (
      <div>
        <Notification message={notification} color={color} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} color={color} />
      <h2>blogs</h2>
      <div>
        <p>
          {user.name} logged in <button onClick={logoutHandler}>logout</button>
        </p>
      </div>
      <h3>Create new</h3>
      {
        <Togglable buttonLabel="create" ref={blogFormRef}>
          <BlogForm createBlog={createBlogHandler} user={user} />
        </Togglable>
      }
      <div>
        {sortedBlogs.map((sortedBlogs) => (
          <Blog
            key={sortedBlogs.id}
            blog={sortedBlogs}
            addLikesHandler={addLikesHandler}
            deleteBlog={removeBlogHandler}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default App
