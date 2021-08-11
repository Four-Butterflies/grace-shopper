import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { editUser } from '../api';

const UserEdit = ({
  showUserEdit,
  setShowUserEdit,
  selectedUser,
  setSelectedUser,
  refreshUser,
  setRefreshUser,
}) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [isadmin, setIsAdmin] = useState('');

  const handleClose = () => {
    setShowUserEdit(false);
  };

  const clearForm = () => {
    setSelectedUser({});
  };

  useEffect(() => {
    setUserName(selectedUser.username);
    setEmail(selectedUser.email);
    setIsAdmin(selectedUser.isadmin);
  }, [selectedUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await editUser(
        {
          username,
          email,
          isadmin,
        },
        selectedUser.id
      );
    } catch (error) {
      console.error(error);
    }

    clearForm();
    setRefreshUser(!refreshUser);
    handleClose();
  };

  return (
    <Modal show={showUserEdit}>
      <Modal.Header>Edit User</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group required>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setUserName(event.target.value)}
              value={username}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="someone@somewhere.com"
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
            <Form.Label>Admin:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Admin"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setIsAdmin(event.target.value)}
              value={isadmin}
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

export default UserEdit;
