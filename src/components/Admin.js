import React, { useState } from 'react';
import { Container, Button, Card, ListGroupItem } from 'react-bootstrap';
import AlbumCreate from './AlbumCreate';
import AlbumEdit from './AlbumEdit';

const Admin = ({ user, admin, allAlbums }) => {
  const [showAlbumCreate, setShowAlbumCreate] = useState(false);
  const [showAlbumEdit, setShowAlbumEdit] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [showAllUsers, setShowAllUsers] = useState(false);

  const handleShowAlbumCreate = () => {
    setShowAlbumCreate(true);
  };

  const handleShowAlbumEdit = () => {
    setShowAlbumEdit(true);
  };

  const handleShowAllUsers = () => {
    setShowAllUsers(true);
  };

  return admin ? (
    <>
      <h1>ADMIN PANEL</h1>
      <h3>Welcome {`${user.username.split(' ')[0]}`}</h3>
      <Container fluid>
        <h3>Albums</h3>
        <Button onClick={handleShowAlbumCreate} variant="warning">
          Create Album
        </Button>
        <Container
          fluid
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {allAlbums.map((album) => {
            return (
              <Card
                style={{ width: '10rem', marginBottom: '1rem' }}
                key={album.album_name + album.artist}
              >
                <Card.Img
                  variant="top"
                  src={album.img_url}
                  alt={album.album_name}
                />
                <Card.Body>
                  <Card.Title>
                    {album.album_name.length < 20
                      ? album.album_name
                      : album.album_name.substring(0, 20) + '...'}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {album.artist} ({album.year})
                  </Card.Subtitle>
                </Card.Body>
                <ListGroupItem>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setSelectedAlbum(album);
                      handleShowAlbumEdit();
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
                </ListGroupItem>
              </Card>
            );
          })}
        </Container>
      </Container>
      <Container fluid>
        <h3>Users</h3>
        <Button onClick={handleShowAllUsers} variant="warning">
          Show All Users
        </Button>
      </Container>
      <AlbumCreate
        showAlbumCreate={showAlbumCreate}
        setShowAlbumCreate={setShowAlbumCreate}
      />
      <AlbumEdit
        showAlbumEdit={showAlbumEdit}
        setShowAlbumEdit={setShowAlbumEdit}
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
      />
    </>
  ) : (
    <h1>Nothing to see here... Move along.</h1>
  );
};

export default Admin;
