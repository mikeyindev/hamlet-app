import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
// Need to set up loaders in webpack to load CSS
import './styles/styles.scss';

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));