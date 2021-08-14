import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../index.css';
import { Navbar, Nav, Container, Form, Button, Image } from 'react-bootstrap';

import { logoutUser } from '../api';

import { SearchBar, LoginModal, RegisterModal } from '../components';

const NavbarComp = (props) => {
  const { user, setUser, admin, setAdmin, allAlbums, setAllAlbums } = props;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const history = useHistory();

  const navButtonStyle = {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
    fontWeight: '600',
    margin: '10px',
    height: '2.5rem',
  };

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
        <Link to={'/'}>
          <Image
            src="https://i.imgur.com/cMgINSb.png"
            rounded
            style={{
              height: '4rem',
              width: '4rem',
              margin: '10px',
              marginRight: '25px',
            }}
          />
        </Link>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button
              onClick={() => {
                history.push('/');
              }}
              variant="primary"
              style={navButtonStyle}
            >
              Home
            </Button>
            <Button
              onClick={() => {
                history.push('/albums');
              }}
              variant="primary"
              style={navButtonStyle}
            >
              Albums
            </Button>
            <Button
              onClick={() => {
                history.push('/orders');
              }}
              variant="primary"
              style={navButtonStyle}
            >
              Cart
            </Button>
            {admin ? (
              <Button
                onClick={() => {
                  history.push('/admin');
                }}
                variant="primary"
                style={navButtonStyle}
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
                  style={navButtonStyle}
                >
                  Login
                </Button>
                <Button
                  onClick={handleShowRegister}
                  variant="primary"
                  style={navButtonStyle}
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
                style={navButtonStyle}
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
