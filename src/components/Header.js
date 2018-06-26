import React from 'react';

const Header = (props) => {
  return <div className="Header">
      <div className="container">
        <h1 className="Header__title">{props.title}</h1>
        {props.subtitle && <h2 className="Header__subtitle">
            {props.subtitle}
          </h2>}
      </div>
    </div>;
};

Header.defaultProps = {
  title: "Hamlet App",
  subtitle: "Put your life in the hands of a machine"
};

export default Header;