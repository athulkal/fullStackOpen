import PropTypes from 'prop-types'
import { button, input } from '../style/global'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handlePasswordChange,
  handleUsernameChange,
}) => {
  return (
    <form onSubmit={handleLogin} className="h-80 w-3/5 ml-auto mr-auto">
      <h3 className="text-xl font-semibold mb-4">Login to application</h3>
      <div className="mb-4">
        <label className="mr-4">username</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          id="username"
          className={`${input} w-52`}
        />
      </div>
      <div>
        <label className="mr-4">password</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          id="password"
          className={`${input} w-52`}
        />
      </div>
      <button className={button} id="login" type="submit">
        Login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
}

export default LoginForm
