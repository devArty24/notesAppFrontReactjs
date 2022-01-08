import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'; //importar linreria de estilos bulma
import Dashboard from './Home'; //importa componente principal

ReactDOM.render(
  <React.StrictMode>
    <Dashboard></Dashboard>
  </React.StrictMode>,
  document.getElementById('root')
);