import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {
  Home,
  NavbarComp,
  CheckoutForm,
  Albums,
  PaginationComponent,
  FooterUnit,
  Admin,
  Orders,
} from './components';

import { getAllAlbums, isAdmin } from './api';

const stripePromise = loadStripe(
  'pk_test_51JIKRDAKg6qdYHfmrwdd1XDwBfUzU6lhJc5JjzWSQIibxbPEAwPSVkgqBAKxr4sG9KihcS9tOZFZ8glLP0R04hJs00x9APJi1Q'
);

const App = () => {
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const [allAlbums, setAllAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(20);
  const [totalAlbums, setTotalAlbums] = useState(0);

  // Check if user is logged in
  // Then, check if they are an admin
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }

    (async () => {
      const resultOrSomething = await isAdmin();

      console.log(resultOrSomething);

      setAdmin(resultOrSomething);
    })();
  }, []);

  // Load a list of our wicked albums 🤘
  useEffect(() => {
    (async () => {
      try {
        const albumsResults = await getAllAlbums();
        setAllAlbums(albumsResults);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <BrowserRouter>
      <NavbarComp user={user} setUser={setUser} />
      <div id="app" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <Switch>
          <Route path={'/admin'}>
            <Admin user={user} admin={admin} />
          </Route>
          <Route path={'/checkout'}>
            <Elements stripe={stripePromise} className="App">
              <CheckoutForm />
            </Elements>
          </Route>
          <Route path={'/'} exact>
            <Home />
          </Route>
          <Route path={'/albums'}>
            <Albums
              allAlbums={allAlbums}
              albumsPerPage={albumsPerPage}
              currentPage={currentPage}
              setTotalAlbums={setTotalAlbums}
            />
            <PaginationComponent
              albumsPerPage={albumsPerPage}
              totalAlbums={totalAlbums}
              paginate={paginate}
            />
          </Route>
          <Route path={'/orders'}>
            <Orders />
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
      </div>
      <FooterUnit />
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
