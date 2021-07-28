import React from 'react';
import '../index.css';

import { 
  Navbar,
  Nav, 
  Container, 
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap'

const NavbarComp = () => {
    return (
        <Navbar expand="lg" style={{
          backgroundColor: 'var(--color-primary)',
        }}>
        <Container>
          <Navbar.Brand href="#home">VINYLS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto" >
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Sale</Nav.Link>
              <Form inline style={{
                marginLeft: '600px' // this styling needs to be fixed
              }}>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavbarComp;
