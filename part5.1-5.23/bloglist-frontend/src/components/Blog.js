import { useState } from 'react'

const Blog = ({ blog, addLikesHandler, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogDetailsHandler = () => {
    setShowDetails(!showDetails)
  }

  const updateBlogHandler = () => {
    const updatingBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    console.log(updatingBlog)
    addLikesHandler(blog.id, updatingBlog)
  }
  const deleteBlogHandler = () => {
    const decision = window.confirm(
      `remove blog ${blog.title} by ${blog.author}`
    )
    if (decision) {
      console.log(blog.id)
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog">
      {blog.title} {blog.author}
      {
        <button onClick={blogDetailsHandler}>
          {showDetails ? 'hide' : 'view'}
        </button>
      }
      {showDetails ? (
        <div>
          <div>{blog.url}</div>
          <div>
            likes : {blog.likes}{' '}
            <button onClick={updateBlogHandler} id="like">
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.name === user.name && (
            <button id="delete" onClick={deleteBlogHandler}>
              delete
            </button>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Blog
