import React from 'react';
import { Form, Button, Modal, FormLabel } from 'react-bootstrap';
import { deleteUser } from '../api';

const UserDelete = ({
  showUserDelete,
  setShowUserDelete,
  selectedUser,
  setSelectedUser,
}) => {
  const handleClose = () => {
    setShowUserDelete(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await deleteUser(selectedUser.id);
    } catch (error) {
      console.error(error);
    }

    setSelectedUser({});
    handleClose();
  };

  return (
    <Modal show={showUserDelete}>
      <Modal.Header>Delete User</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormLabel>
            Are you sure you want to delete <b>{selectedUser.username}</b>?
          </FormLabel>
          <Form.Group>
            <Button
              type="Submit"
              style={{ float: 'right', marginLeft: '1rem' }}
              variant="danger"
            >
              Delete
            </Button>
            <Button
              style={{ float: 'right' }}
              variant="secondary"
              onClick={() => {
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

export default UserDelete;
