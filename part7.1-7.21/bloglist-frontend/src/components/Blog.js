import { useState } from 'react'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { input, button } from '../style/global'

const Blog = ({ blog, addLikesHandler, deleteBlog, user }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const updateBlogHandler = () => {
    const updatingBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    console.log(updatingBlog)

    addLikesHandler({ id: blog.id, updatingBlog })
  }
  const deleteBlogHandler = () => {
    const decision = window.confirm(
      `remove blog ${blog.title} by ${blog.author}`
    )
    if (decision) {
      deleteBlog(blog.id)
    }
  }
  const addCommentHandler = (e) => {
    e.preventDefault()
    const updatedComment = { comment: comment }
    dispatch(commentBlog({ updatedComment, id: blog.id }))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div className="p-20">
      <h1 className="text-xl font-semibold mb-8">
        {blog.title} {blog.author}
      </h1>
      <div>
        <div>
          <a href={blog.url} className="text-blue-600 visited:text-purple-600">
            {blog.url}
          </a>
        </div>
        <div>
          likes : {blog.likes}{' '}
          <button
            className={`${button} ml-2`}
            onClick={updateBlogHandler}
            id="like"
          >
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
        {blog.user.name === user.name && (
          <button className={button} id="delete" onClick={deleteBlogHandler}>
            delete
          </button>
        )}
        <div>
          <h3>comments</h3>
          <div style={{ marginBottom: '20px' }}>
            <form onSubmit={addCommentHandler}>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`${input} w-3/12`}
              />
              <button className={`${button} ml-2`} type="submit">
                comment
              </button>
            </form>
          </div>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
