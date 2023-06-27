import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handlePasswordChange,
  handleUsernameChange,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h3>Login to application</h3>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          id="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          id="password"
        />
      </div>
      <button id="login" type="submit">
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
