import React, { useState } from 'react';
import { loginUser } from '../api';
import { Form, Button, Modal } from 'react-bootstrap';

import { isAdmin } from './../api';

// TODO - Add message when login fails
const LoginModal = ({ showLogin, setShowLogin, setUser, setAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setShowLogin(false);
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <Modal show={showLogin} size="mini">
      <Modal.Header
        className="login-user-header"
        style={{
          backgroundColor: '#18d1e7',
          color: 'white',
          borderBottom: '2px solid blue',
        }}
      >
        Login
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: 'lightgrey',
        }}
      >
        <Form
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const { user } = await loginUser(email, password);
              setUser(user);

              const adminRes = await isAdmin();
              setAdmin(adminRes);
            } catch (error) {
              console.error(error);
            }

            clearForm();
            handleClose();
          }}
        >
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              required
            />
          </Form.Group>
          <Form.Group>
            <Button
              type="Submit"
              variant="primary"
              style={{     
              float: 'right',         
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
              fontWeight: '600',
              textTransform: 'uppercase',
              textDecoration: 'none',
              webkitTransition: 'all 150ms ease',
              transition: 'all 150ms ease',
              margin: '10px',
              height: '2.5rem',
              }}
            >
              Submit
            </Button>
            <Button
                  variant="primary"
                  style={{     
                  float: 'right',         
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  webkitTransition: 'all 150ms ease',
                  transition: 'all 150ms ease',
                  margin: '10px',
                  height: '2.5rem',
                  }}
                
              onClick={() => {
                clearForm();
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
