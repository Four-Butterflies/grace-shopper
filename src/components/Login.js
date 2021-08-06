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
          backgroundColor: 'green',
          color: 'white',
          borderBottom: '2px solid black',
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
              style={{ float: 'right', marginLeft: '1rem' }}
              variant="success"
            >
              Submit
            </Button>
            <Button
              style={{ float: 'right' }}
              variant="secondary"
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
