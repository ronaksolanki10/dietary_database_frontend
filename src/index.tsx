import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

/**
 * Renders the root component of the application.
 * 
 * @returns {void}
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);