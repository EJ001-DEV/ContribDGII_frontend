import logo from './logo.svg';
import './App.css';

import React from 'react';
import ContribuyentesList from './components/ContribuyentesList';

const App = () => {
  return (
    <div>
      <h1>Aplicación de Contribuyentes</h1>
      <ContribuyentesList />
    </div>
  );
};

export default App;
