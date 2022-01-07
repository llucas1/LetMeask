import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//importando o banco de dados para
import './services/Firebase';

//importando o scss
import './Style/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
