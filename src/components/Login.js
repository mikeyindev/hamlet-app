import React from 'react';

const Login = (props) => (
  <div>
    {!props.isLoggedIn ? 
      <button className="button--menu button--login" onClick={props.handleLogin}>Login
      </button> :
      <button className="button--menu button--logout" onClick={props.handleLogout}>
        Logout
      </button>}
  </div>
);

export default Login;