import React from 'react';

const Login = (props) => (
  <div>
    {!props.isLoggedIn ? 
      <button className="Menu__button" onClick={props.handleLogin}>Login
      </button> :
      <button className="Menu__button" onClick={props.handleLogout}>
        Logout
      </button>}
  </div>
);

export default Login;