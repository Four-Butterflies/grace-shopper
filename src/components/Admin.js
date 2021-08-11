import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Card,
  ListGroupItem,
  Accordion,
} from 'react-bootstrap';
import AlbumCreate from './AlbumCreate';
import AlbumEdit from './AlbumEdit';
import AlbumDelete from './AlbumDelete';
import UserEdit from './UserEdit';
import UserDelete from './UserDelete';
import { getAllUsers } from '../api/index.js';

const Admin = ({ user, admin, allAlbums, refreshAlbums, setRefreshAlbums }) => {
  const [showAlbumCreate, setShowAlbumCreate] = useState(false);
  const [showAlbumEdit, setShowAlbumEdit] = useState(false);
  const [showAlbumDelete, setShowAlbumDelete] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState({});

  const handleShowAlbumCreate = () => {
    setShowAlbumCreate(true);
  };

  const handleShowAlbumEdit = () => {
    setShowAlbumEdit(true);
  };

  const handleShowAlbumDelete = () => {
    setShowAlbumDelete(true);
  };

  const [allUsers, setAllUsers] = useState([]);
  const [showUserEdit, setShowUserEdit] = useState(false);
  const [showUserDelete, setShowUserDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [refreshUser, setRefreshUser] = useState(false);

  const handleShowUserEdit = () => {
    setShowUserEdit(true);
  };

  const handleShowUserDelete = () => {
    setShowUserDelete(true);
  };

  useEffect(() => {
    (async () => {
      const { users } = await getAllUsers();
      setAllUsers(users);
    })();
  }, [refreshUser]);

  return admin ? (
    <>
      <h1>ADMIN PANEL</h1>
      <h3>Welcome {`${user.username.split(' ')[0]}`}</h3>
      <Container fluid>
        <h3>Albums</h3>
        <Button onClick={handleShowAlbumCreate} variant="warning">
          Create Album
        </Button>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Albums</Accordion.Header>
            <Accordion.Body>
              <Container
                fluid
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                }}
              >
                {allAlbums
                  .sort((a, b) => {
                    return a.id - b.id;
                  })
                  .map((album) => {
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
                            style={{ width: '7rem' }}
                            onClick={() => {
                              setSelectedAlbum(album);
                              handleShowAlbumEdit();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            style={{ width: '7rem' }}
                            onClick={() => {
                              setSelectedAlbum(album);
                              handleShowAlbumDelete();
                            }}
                          >
                            Delete
                          </Button>
                        </ListGroupItem>
                      </Card>
                    );
                  })}
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <Container fluid>
        <h3>Users</h3>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Users</Accordion.Header>
            <Accordion.Body>
              <Container
                fluid
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                }}
              >
                {allUsers
                  .sort((a, b) => {
                    return a.id - b.id;
                  })
                  .map((user) => {
                    return (
                      <Card
                        style={{ width: '10rem', marginBottom: '1rem' }}
                        key={user.email}
                      >
                        <Card.Body>
                          <Card.Title>{user.username}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {/* {album.artist} ({album.year}) */}
                          </Card.Subtitle>
                        </Card.Body>
                        <ListGroupItem>
                          <Button
                            variant="warning"
                            style={{ width: '7rem' }}
                            onClick={() => {
                              setSelectedUser(user);
                              handleShowUserEdit();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            style={{ width: '7rem' }}
                            onClick={() => {
                              setSelectedUser(user);
                              handleShowUserDelete();
                            }}
                          >
                            Delete
                          </Button>
                        </ListGroupItem>
                      </Card>
                    );
                  })}
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <AlbumCreate
        showAlbumCreate={showAlbumCreate}
        setShowAlbumCreate={setShowAlbumCreate}
        refreshAlbums={refreshAlbums}
        setRefreshAlbums={setRefreshAlbums}
      />
      <AlbumEdit
        showAlbumEdit={showAlbumEdit}
        setShowAlbumEdit={setShowAlbumEdit}
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
        refreshAlbums={refreshAlbums}
        setRefreshAlbums={setRefreshAlbums}
      />
      <AlbumDelete
        showAlbumDelete={showAlbumDelete}
        setShowAlbumDelete={setShowAlbumDelete}
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
        refreshAlbums={refreshAlbums}
        setRefreshAlbums={setRefreshAlbums}
      />
      <UserEdit
        showUserEdit={showUserEdit}
        setShowUserEdit={setShowUserEdit}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        refreshUser={refreshUser}
        setRefreshUser={setRefreshUser}
      />
      <UserDelete
        showUserDelete={showUserDelete}
        setShowUserDelete={setShowUserDelete}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        refreshUser={refreshUser}
        setRefreshUser={setRefreshUser}
      />
    </>
  ) : (
    <h1>Nothing to see here... Move along.</h1>
  );
};

export default Admin;
