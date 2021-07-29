import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

const NavbarComp = () => {
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
          Vinyl 🤘
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
            <Form
              inline
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
