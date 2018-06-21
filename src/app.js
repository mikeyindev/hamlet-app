import React from 'react';
import ReactDOM from 'react-dom';
import HamletApp from './components/HamletApp';
// Need to set up loaders in webpack to load CSS
import './styles/styles.scss';
// When importing from node_modules directory, no need to specify path. Normalize.css is used for CSS reset
import 'normalize.css/normalize.css';
import { database, firebase } from '../Firebase/firebase';

ReactDOM.render(<HamletApp />, document.getElementById("app"));