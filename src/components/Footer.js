import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../index.css';

const FooterUnit = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: 'var(--color-primary)',
        textDecoration: 'underline',
        color: 'white',
      }}
      className="fixed-bottom"
    >
      <Row>
        <Col> </Col>
        <Col>
          <Link to={'/'} style={{ marginLeft: '1rem', color: 'white' }}>
            About Us
          </Link>
        </Col>
        <Col>
          <Link to={'/'} style={{ marginLeft: '1rem', color: 'white' }}>
            Contact
          </Link>
        </Col>
        <Col
          style={{
            textAlign: 'right',
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
