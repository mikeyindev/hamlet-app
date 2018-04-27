import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './components/AddOption';
import Option from './components/Option';
import Action from './components/Action';
import Options from './components/Options';
import Header from './components/Header';
import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(
  <IndecisionApp options={["a", "b", "c"]} />,
  document.getElementById("app")
);