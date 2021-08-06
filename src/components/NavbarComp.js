import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

import { logoutUser } from '../api';

import LoginModal from './Login.js';
import RegisterModal from './Register.js';

const NavbarComp = (props) => {
  const { user, setUser } = props;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: 'var(--color-primary)',
      }}
      className="fixed-top"
    >
      <Container>
        <Link
          to={'/'}
          style={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            width: '4rem',
          }}
        >
          <>
            Vinyl{' '}
            <span role="img" aria-label="Rock and Roll">
              🤘
            </span>
          </>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Navbar.Text>
              <Link to={'/'} style={{ marginLeft: '1rem' }}>
                Home
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to={'/albums'} style={{ marginLeft: '1rem' }}>
                Albums
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to={'/orders'} style={{ marginLeft: '1rem' }}>
                Cart
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to={'/checkout'} style={{ marginLeft: '1rem' }}>
                Checkout
              </Link>
            </Navbar.Text>
            <Form
              style={{
                marginLeft: '600px', // this styling needs to be fixed
              }}
            >
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
            {!user.username ? (
              <>
                <Button
                  onClick={handleShowLogin}
                  variant="warning"
                  style={{ marginLeft: '1rem' }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleShowRegister}
                  variant="warning"
                  style={{ marginLeft: '1rem' }}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  logoutUser();
                  setUser({});
                }}
                variant="warning"
                style={{ marginLeft: '1rem' }}
              >
                Logout ({user.username.split(' ')[0]})
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setUser={setUser}
      />
      <RegisterModal
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        setUser={setUser}
      />
    </Navbar>
  );
};

export default NavbarComp;
