import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div className="ml-auto mr-auto w-72 h-80">
      <h2 className="text-xl mb-8 font-semibold">Users</h2>
      <table className="table-auto">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              user
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              blogs
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-3 text-sm text-gray-700">
                <Link to={`/users/${user.id}`} className="text-blue-600">
                  {user.name}
                </Link>
              </td>
              <td className="p-3 text-sm text-gray-700">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
