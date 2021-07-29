import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { Home, NavbarComp } from './components';

import { getSomething } from './api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <BrowserRouter>
      <NavbarComp />
      <Switch>
        <Route path={'/albums'}>
          <div>HELLO! ALBUMS!</div>
        </Route>
        <Route path={'/'} exact>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
