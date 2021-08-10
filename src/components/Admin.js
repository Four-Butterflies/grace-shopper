import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import AlbumCreate from './AlbumCreate';

const Admin = ({ user, admin }) => {
  const [showAlbumCreate, setShowAlbumCreate] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const handleShowAlbumCreate = () => {
    setShowAlbumCreate(true);
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
    </>
  ) : (
    <h1>Nothing to see here... Move along.</h1>
  );
};

export default Admin;
