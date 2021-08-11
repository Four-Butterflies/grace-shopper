import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { editAlbum } from '../api';

const AlbumEdit = ({
  showAlbumEdit,
  setShowAlbumEdit,
  selectedAlbum,
  setSelectedAlbum,
}) => {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState('');
  const [release_date, setReleaseDate] = useState('');
  const [genres, setGenres] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reorder, setReorder] = useState('');
  const [image, setImage] = useState('');
  const [total_tracks, setTotalTracks] = useState('');
  const [spotify, setSpotify] = useState('');

  const handleClose = () => {
    setShowAlbumEdit(false);
  };

  const clearForm = () => {
    setSelectedAlbum({});
  };

  console.log(selectedAlbum);

  useEffect(() => {
    setName(selectedAlbum.album_name);
    setArtists(selectedAlbum.artist);
    setReleaseDate(selectedAlbum.year);
    setGenres(selectedAlbum.genres ? selectedAlbum.genres.join(', ') : '');
    setPrice(selectedAlbum.price);
    setQuantity(selectedAlbum.quantity);
    setReorder(selectedAlbum.reorder_number);
    setImage(selectedAlbum.img_url);
    setTotalTracks(selectedAlbum.total_tracks);
    setSpotify(selectedAlbum.spotify);
  }, [selectedAlbum]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await editAlbum(
        {
          name,
          artists,
          release_date,
          genres,
          price,
          quantity,
          reorder,
          image,
          total_tracks,
          spotify,
        },
        selectedAlbum.id
      );
    } catch (error) {
      console.error(error);
    }

    clearForm();
    handleClose();
  };

  return (
    <Modal show={showAlbumEdit}>
      <Modal.Header>Edit Album</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group required>
            <Form.Label>Album Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Album Name"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setName(event.target.value)}
              value={name}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Artist:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Artist"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setArtists(event.target.value)}
              value={artists}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Year:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Year"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setReleaseDate(event.target.value)}
              value={release_date}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>
              Genres: (Enter multiple separated by commas)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder='Ex: "Rock, Indie Rock, etc."'
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setGenres(event.target.value)}
              value={genres}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Price"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setPrice(event.target.value)}
              value={price}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Quantity"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setQuantity(event.target.value)}
              value={quantity}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Reorder Number:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Reorder Number"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setReorder(event.target.value)}
              value={reorder}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image URL"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setImage(event.target.value)}
              value={image}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Total Tracks:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Total Tracks"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setTotalTracks(event.target.value)}
              value={total_tracks}
              required
            />
          </Form.Group>
          <Form.Group required>
            <Form.Label>Spotify:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Spotify"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(event) => setSpotify(event.target.value)}
              value={spotify}
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

export default AlbumEdit;
