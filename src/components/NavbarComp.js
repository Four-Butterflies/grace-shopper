import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../index.css';
import { Navbar, Nav, Container, Form, Button, Image } from 'react-bootstrap';

import { logoutUser } from '../api';

import { SearchBar, LoginModal, RegisterModal } from '../components';

const NavbarComp = (props) => {
  const { user, setUser, admin, setAdmin, allAlbums, setAllAlbums } = props;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const history = useHistory();

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
        backgroundColor: '#18d1e7',
      }}
      className="fixed-top"
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Image
            src="https://americanvinylco.com/wp-content/uploads/2019/06/americanvinyl0.png"
            rounded
            style={{
              height: '4rem',
              width: '4rem',
              margin: '10px',
              marginRight: '25px',
              justifyContent: 'center',
            }}
          />
          <Nav className="me-auto">
            <Button
              onClick={() => {
                history.push('/');
              }}
              variant="primary"
              style={{
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                fontWeight: '600',
                textTransform: 'uppercase',
                textDecoration: 'none',
                WebkitTransition: 'all 150ms ease',
                transition: 'all 150ms ease',
                margin: '10px',
                height: '2.5rem',
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => {
                history.push('/albums');
              }}
              variant="primary"
              style={{
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                fontWeight: '600',
                textTransform: 'uppercase',
                textDecoration: 'none',
                WebkitTransition: 'all 150ms ease',
                transition: 'all 150ms ease',
                margin: '10px',
                height: '2.5rem',
              }}
            >
              Albums
            </Button>
            <Button
              onClick={() => {
                history.push('/orders');
              }}
              variant="primary"
              style={{
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                fontWeight: '600',
                textTransform: 'uppercase',
                textDecoration: 'none',
                WebkitTransition: 'all 150ms ease',
                transition: 'all 150ms ease',
                margin: '10px',
                height: '2.5rem',
              }}
            >
              Cart
            </Button>
            {admin ? (
              <Button
                onClick={() => {
                  history.push('/admin');
                }}
                variant="primary"
                style={{
                  boxShadow:
                    '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  WebkitTransition: 'all 150ms ease',
                  transition: 'all 150ms ease',
                  margin: '10px',
                  height: '2.5rem',
                }}
              >
                Admin
              </Button>
            ) : (
              ''
            )}
            {!user.username ? (
              <>
                <Button
                  onClick={handleShowLogin}
                  variant="primary"
                  style={{
                    boxShadow:
                      '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    WebkitTransition: 'all 150ms ease',
                    transition: 'all 150ms ease',
                    margin: '10px',
                    height: '2.5rem',
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleShowRegister}
                  variant="primary"
                  style={{
                    boxShadow:
                      '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    WebkitTransition: 'all 150ms ease',
                    transition: 'all 150ms ease',
                    margin: '10px',
                    height: '2.5rem',
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  logoutUser();
                  setUser({});
                  setAdmin(false);
                }}
                variant="primary"
                style={{
                  boxShadow:
                    '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  WebkitTransition: 'all 150ms ease',
                  transition: 'all 150ms ease',
                  margin: '10px',
                  height: '2.5rem',
                }}
              >
                Logout ({user.username.split(' ')[0]})
              </Button>
            )}
            <Form
              style={{
                marginLeft: '100px',
                marginBottom: '10px',
              }}
            >
              <SearchBar allAlbums={allAlbums} setAllAlbums={setAllAlbums} />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setUser={setUser}
        setAdmin={setAdmin}
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
