import React from 'react';

// Use props.children to render nested components such as 'MusicPlayer'.
const Menu = (props) => (
  <div className="Menu">
    {props.children}
  </div>
);

export default Menu;