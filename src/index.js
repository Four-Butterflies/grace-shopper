import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js'; 
import {Elements} from '@stripe/react-stripe-js' 

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { 
    Home,
    NavbarComp,
    CheckoutForm
 } from './components';


import { getSomething } from './api';

const stripePromise = loadStripe('pk_test_51JIKRDAKg6qdYHfmrwdd1XDwBfUzU6lhJc5JjzWSQIibxbPEAwPSVkgqBAKxr4sG9KihcS9tOZFZ8glLP0R04hJs00x9APJi1Q');

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
        <Route>
          <h1>404 Page Not Found</h1>
          <img
            src="https://vignette.wikia.nocookie.net/spongebob/images/f/f7/Krab_Borg_003.png/revision/latest?cb=20200726123800"
            width="480px"
            alt="night of the robot 404"
          />
        </Route>
      </Switch>
    </BrowserRouter>
    <Elements stripe={stripePromise} className="App">
      <NavbarComp />
      {/* <Home /> */}
      <CheckoutForm />
    </Elements>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
