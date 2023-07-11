import React from 'react'
import { useNavigate } from 'react-router'
const User = ({ user }) => {
  const navigate = useNavigate()

  const navigateHandler = (id) => {
    navigate(`/blogs/${id}`)
  }

  if (!user) {
    return null
  }

  return (
    <div className="w-3/6 h-80 ml-auto mr-auto pl-3">
      <div>
        <h1 className="text-xl font-semibold mb-4">{user.name}</h1>
      </div>
      <h3 className="text-lg mb-3">added blogs</h3>
      <ul className="text-sm">
        {user.blogs.map((blog) => (
          <li
            className="w-52 hover:bg-orange-50 mb-2 cursor-pointer"
            key={blog.id}
            onClick={() => navigateHandler(blog.id)}
          >
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
