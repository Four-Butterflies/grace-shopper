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
  AlbumInformation,
  Contact,
  AboutUs,
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
  const [albumsPerPage] = useState(24);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState({});
  const [orderCheckOut, setOrderCheckOut] = useState();
  const [refreshAlbums, setRefreshAlbums] = useState(false);

  // Check if user is logged in
  // Then, check if they are an admin
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }

    (async () => {
      const adminRes = await isAdmin();
      setAdmin(adminRes);
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
  }, [refreshAlbums]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <BrowserRouter>
      <NavbarComp
        allAlbums={allAlbums}
        setAllAlbums={setAllAlbums}
        user={user}
        setUser={setUser}
        admin={admin}
        setAdmin={setAdmin}
      />
      <div id="app" style={{ paddingBottom: '3rem' }}>
        <Switch>
          <Route path={'/admin'}>
            <Admin
              user={user}
              admin={admin}
              allAlbums={allAlbums}
              refreshAlbums={refreshAlbums}
              setRefreshAlbums={setRefreshAlbums}
            />
          </Route>
          <Route path={'/checkout'}>
            <Elements stripe={stripePromise} className="App">
              <CheckoutForm
                orderCheckOut={orderCheckOut}
                setOrderCheckOut={setOrderCheckOut}
              />
            </Elements>
          </Route>
          <Route path={'/'} exact>
            <Home setCurrentAlbum={setCurrentAlbum} />
          </Route>
          <Route exact path={'/albums'}>
            <Albums
              allAlbums={allAlbums}
              albumsPerPage={albumsPerPage}
              currentPage={currentPage}
              setTotalAlbums={setTotalAlbums}
              setCurrentAlbum={setCurrentAlbum}
              currentAlbum={currentAlbum}
            />
            <PaginationComponent
              albumsPerPage={albumsPerPage}
              totalAlbums={totalAlbums}
              paginate={paginate}
            />
          </Route>
          <Route exact path={`/albums/:albumId`}>
            <AlbumInformation currentAlbum={currentAlbum} />
          </Route>
          <Route path={'/orders'}>
            <Orders setOrderCheckOut={setOrderCheckOut} />
          </Route>
          <Route path={'/contact'}>
            <Contact />
          </Route>
          <Route path={'/about'}>
            <AboutUs />
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
