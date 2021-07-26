import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { 
    Home,
    NavbarComp
 } from './components';

import {
    getSomething
  } from './api';

const App = () => {
    const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <NavbarComp />
      <Home />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
