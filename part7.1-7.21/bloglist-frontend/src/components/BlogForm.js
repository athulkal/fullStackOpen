import { useState } from 'react'
import PropTypes from 'prop-types'
import { button, input } from '../style/global'

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
    <div>
      <form onSubmit={createBlogHandler} className="flex mb-2">
        <div>
          title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            className={input}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            id="author"
            className={input}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="url"
            className={input}
          />
        </div>
        <button id="create-btn" className={`${button} ml-2 h-9 mt-6`}>
          Create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
