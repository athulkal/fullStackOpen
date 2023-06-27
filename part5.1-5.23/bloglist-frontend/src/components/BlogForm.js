import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const createBlogHandler = (e) => {
    e.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createBlogHandler}>
      <div>
        title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          id="author"
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          id="url"
        />
      </div>
      <button id="create-btn">Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
