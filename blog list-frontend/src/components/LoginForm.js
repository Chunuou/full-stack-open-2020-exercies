import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      username:
      <input
        id="username"
        type="text"
        name="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      password:
      <input
        id="password"
        type="password"
        name="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button id="log-in" type="submit">
        log in
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
