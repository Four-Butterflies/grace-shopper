import React from 'react';
import { Form, Button, Modal, FormLabel } from 'react-bootstrap';
import { deleteAlbum } from '../api';

const AlbumDelete = ({
  showAlbumDelete,
  setShowAlbumDelete,
  selectedAlbum,
  setSelectedAlbum,
}) => {
  const handleClose = () => {
    setShowAlbumDelete(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await deleteAlbum(selectedAlbum.id);
    } catch (error) {
      console.error(error);
    }

    setSelectedAlbum({});
    handleClose();
  };

  return (
    <Modal show={showAlbumDelete}>
      <Modal.Header>Delete Album</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormLabel>
            Are you sure you want to delete <b>{selectedAlbum.album_name}</b> by{' '}
            <b>{selectedAlbum.artist}</b>?
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

export default AlbumDelete;
