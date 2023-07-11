import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import Users from './components/Users'
import User from './components/User'
import { updateNotification } from './reducers/notificationReducer'
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from './reducers/blogReducer'
import { getUser, setUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/allUserReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import BlogList from './components/BlogList'
import Blog from './components/Blog'

const App = () => {
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs.blogs)
  const blogStatus = useSelector((state) => state.blogs.status)
  const user = useSelector((state) => state.user.user)
  const userStatus = useSelector((state) => state.user.status)
  const userError = useSelector((state) => state.user.error)
  const status = useSelector((state) => state.allUsers.status)
  const users = useSelector((state) => state.allUsers.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userMatch = useMatch('/users/:id')
  const userProp = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [color, setColor] = useState('')

  const blogFormRef = useRef()

  console.log(userError)
  useEffect(() => {
    if (blogStatus === 'idle') dispatch(getBlogs())
  }, [])

  useEffect(() => {
    const userLoggedJSON = window.localStorage.getItem('loggedInUser')
    if (userLoggedJSON) {
      const userInfo = JSON.parse(userLoggedJSON)
      dispatch(setUser(userInfo))
    }
  }, [])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllUsers())
    }
  }, [dispatch])

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(getUser({ username, password }))
      .unwrap()
      .then((user) => {
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        setUsername('')
        setPassword('')
        dispatch(updateNotification(`${user.name} logged in successfully`, 5))
        setColor('green')
      })
    navigate('/')
    if (userStatus === 'failed') {
      setUsername('')
      setPassword('')
      dispatch(updateNotification(userError, 5))
      setColor('red')
    }
  }

  const createBlogHandler = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(getBlogs())
      setColor('green')
      dispatch(
        updateNotification(
          `a new blog ${newBlog.title} by ${newBlog.author}`,
          5
        )
      )
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
    dispatch(setUser(null))
  }
  const addLikesHandler = (id, updatedBlog) => {
    dispatch(updateBlog(id, updatedBlog))
  }
  const removeBlogHandler = (id) => {
    dispatch(deleteBlog(id))
    dispatch(getBlogs())
  }

  if (user === null) {
    return (
      <div>
        {notification && <Notification message={notification} color={color} />}
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
      {notification && <Notification message={notification} color={color} />}
      <Navbar user={user} logoutHandler={logoutHandler} />
      <h1 className="text-3xl font-bold mb-3 ml-10">Blogs</h1>
      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              createBlogHandler={createBlogHandler}
              blogFormRef={blogFormRef}
              user={user}
            />
          }
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={userProp} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              deleteBlog={removeBlogHandler}
              addLikesHandler={addLikesHandler}
              user={user}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
