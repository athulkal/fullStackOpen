import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs, createBlogHandler, user, blogFormRef }) => {
  return (
    <div className="ml-10">
      {
        <Togglable buttonLabel="create" ref={blogFormRef}>
          <BlogForm createBlog={createBlogHandler} user={user} />
        </Togglable>
      }
      {blogs.map((blog) => (
        <div
          className="h-24 mt-4 bg-white text-center hover:bg-black hover:text-white"
          key={blog.id}
        >
          <Link to={`/blogs/${blog.id}`} className="mt-5">
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
