import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, logoutHandler }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div className="bg-black h-10 text-white text-center pt-2 pl-2 mb-10">
      <ul className="flex mb-6">
        <li className="mr-6">
          <Link style={padding} to="/">
            blogs
          </Link>
        </li>
        <li className="mr-6">
          <Link style={padding} to="/users">
            users
          </Link>
        </li>
        <li className="mr-6">
          {user.name} logged in{' '}
          <button
            className="rounded bg-white text-black ml-2 w-20"
            onClick={logoutHandler}
          >
            logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
