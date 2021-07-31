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

import LoginModal from './Login.js';

const NavbarComp = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: 'var(--color-primary)',
      }}
    >
      <Container>
        <Link
          to={'/'}
          style={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            margin: '0.5rem',
          }}
        >
          Vinyl{' '}
          <span role="img" aria-label="Rock and Roll">
            🤘
          </span>
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
            <Button
              onClick={handleShowLogin}
              variant="warning"
              style={{ marginLeft: '1rem' }}
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
    </Navbar>
  );
};

export default NavbarComp;
