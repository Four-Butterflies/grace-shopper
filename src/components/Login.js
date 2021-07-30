import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Modal } from 'react-bootstrap';

// TODO - Move axios call to func in /src/api
//      - Pass in setLogin and setUser hooks from somewhere
//      - Test to make sure this thing works lol
//      - I just made sure this renders
const LoginModal = ({ showLogin, setShowLogin, setLogin, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setShowLogin(false);
  };

  const loginUser = () => {
    if (!username && !password) {
      return;
    }

    axios
      .post('/api/users/login', { username, password })
      .then((res) => {
        console.log('Logged-in User: ', res.data);

        if (res.data.status === 'IncorrectCredentialsError') {
          return alert('Username or password is incorrect. Please try again.');
        } else {
          setUser(res.data.user);
          localStorage.setItem('token', res.data.token);
          console.log(localStorage.getItem('token'));
          if (res.data.user) {
            setLogin(true);
          }
        }
      })
      .catch((error) => {
        console.error('Error logging in!', error);
      });
  };

  const clearForm = () => {
    setUsername('');
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
        User Login
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: 'lightgrey',
        }}
      >
        <Form>
          <Form.Group required>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: 'darkgrey',
          color: 'white',
          borderTop: '2px solid black',
        }}
      >
        <Button
          negative
          style={{
            boxShadow: '3px 3px 5px black',
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Submit"
          style={{
            backgroundColor: 'olivedrab',
            boxShadow: '3px 3px 5px black',
          }}
          onClick={() => {
            loginUser();
            handleClose();
            clearForm();
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
