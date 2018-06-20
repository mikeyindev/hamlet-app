import React from 'react';

// Use props.children to render nested components such as 'MusicPlayer'.
const MenuBar = (props) => (
  <div className="menu-bar">
    {props.children}
  </div>
);

export default MenuBar;