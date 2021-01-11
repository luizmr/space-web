import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/_all.scss'

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

