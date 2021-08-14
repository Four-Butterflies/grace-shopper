import React, { useState } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { PaginationComponent } from '.';

const Albums = ({ allAlbums, setCurrentAlbum }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalAlbums = allAlbums.length;
  const albumsPerPage = 24; // A lot of things are divisible by 24, it's a good number!

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = allAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const history = useHistory();

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '100%',
          justifyContent: 'space-around',
          padding: '1rem'
        }}
      >
        {currentAlbums.map((album) => {
          return (
            <Card
              key={album.id}
              style={{ width: '18rem', marginBottom: '1rem' }}
            >
              <Card.Img
                variant="top"
                src={album.img_url}
                alt={album.album_name}
                style={{
                  boxShadow:
                    '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 12px #186AE7',
                  border: '2px solid lightgray',
                }}
              />
              <Card.Body>
                <Card.Title>{album.album_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {album.artist} ({album.year})
                </Card.Subtitle>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{album.total_tracks} Tracks</ListGroupItem>
                <ListGroupItem>Price: ${album.price / 100}</ListGroupItem>
                <ListGroupItem
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Button
                    variant="primary"
                    style={{
                      width: '14rem',
                      fontSize: '0.8rem',
                      boxShadow:
                        '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                      margin: '5px',
                      height: '2rem',
                    }}
                    onClick={async () => {
                      await setCurrentAlbum(album);
                      history.push(`/albums/${album.id}`);
                    }}
                  >
                    See Details
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          );
        })}
      </div>
      <span style={{ display: 'flex', justifyContent: 'center' }}>
        <PaginationComponent
          albumsPerPage={albumsPerPage}
          totalAlbums={totalAlbums}
          paginate={paginate}
        />
      </span>
    </>
  );
};

export default Albums;
