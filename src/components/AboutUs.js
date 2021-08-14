import React from 'react';
import { Card } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '70%', margin: '4rem' }}>
        <Card.Header>About Us</Card.Header>
        <Card.Body>
          <p>
            Four Butterflies is a collective of programmers who set out to
            create the single best, react-based, vinyl ecommerce site ever
            submitted to Fullstack Academy's Grace Shopper capstone project.
          </p>
          <p>
            If you look in the{' '}
            <a href="https://github.com/Four-Butterflies/grace-shopper/blob/master/README.md">
              README on Github
            </a>{' '}
            for this project, this will become extremely evident.
          </p>
          <p>
            We love ecommerce, and we love music. The choice was obvious for us.
          </p>
          <p>
            We hope it is just as obvious to you that you should spend your time
            browsing this site and your money on some albums here{' '}
            <span role="img" aria-label="money">
              🤑
            </span>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AboutUs;
