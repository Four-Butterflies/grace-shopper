import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../index.css';

const FooterUnit = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: '#18d1e7',
        textDecoration: 'underline',
        color: 'white',
      }}
      className="fixed-bottom"
    >
      <Row>
        <Col> </Col>
        <Col>
          <Link to={'/about'} 
            style={{ 
              marginLeft: '1rem', 
              color: 'white',
              alignItems: 'flex-start', 
              }}>
            About Us
          </Link>
        </Col>
        <Col>
          <Link to={'/contact'} style={{ marginLeft: '1rem', color: 'white' }}>
            Contact
          </Link>
        </Col>
        <Col
          style={{
            textAlign: 'right',
            alignItems: 'flex-end',
            fontSize: '0.8rem',
          }}
        >
          A Four Butterflies Production <span>&copy;</span> 2021
        </Col>
        <Col> </Col>
      </Row>
    </Container>
  );
};

export default FooterUnit;
