import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../index.css';

const FooterUnit = () => {
  return (
    <Navbar
      style={{
        backgroundColor: '#18d1e7',
        textDecoration: 'underline',
        color: 'white',
        justifyContent: 'space-around',
        height: '1.5rem',
      }}
      className="fixed-bottom"
    >
      <span>
        <Link
          to={'/about'}
          style={{
            marginLeft: '1rem',
            color: 'white',
            alignItems: 'flex-start',
          }}
        >
          About Us
        </Link>

        <Link to={'/contact'} style={{ marginLeft: '1rem', color: 'white' }}>
          Contact
        </Link>

        <a
          href={'https://github.com/Four-Butterflies/grace-shopper'}
          style={{ marginLeft: '1rem', color: 'white' }}
        >
          Github
        </a>
      </span>

      <span
        style={{
          textAlign: 'right',
          alignItems: 'flex-end',
          fontSize: '0.8rem',
        }}
      >
        A Four Butterflies Production <span>&copy;</span> 2021
      </span>
    </Navbar>
  );
};

export default FooterUnit;
