import React from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Albums = ({
  allAlbums,
  currentPage,
  albumsPerPage,
  setTotalAlbums,
  setCurrentAlbum,
}) => {
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = allAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  setTotalAlbums(allAlbums.length);

  const history = useHistory();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '960px',
        justifyContent: 'space-around',
        margin: 'auto',
      }}
    >
      {currentAlbums.map((album) => {
        return (
          <Card key={album.id} style={{ width: '18rem', marginBottom: '1rem' }}>
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
              <ListGroupItem>
                <Button
                  variant="primary"
                  style={{
                    width: '100px',
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    alignItems: 'center',
                    boxShadow:
                      '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                    fontWeight: '450',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    webkitTransition: 'all 150ms ease',
                    transition: 'all 150ms ease',
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
                <Button
                  variant="primary"
                  style={{
                    width: '120px',
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    alignItems: 'center',
                    boxShadow:
                      '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                    fontWeight: '450',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    webkitTransition: 'all 150ms ease',
                    transition: 'all 150ms ease',
                    margin: '5px',
                    height: '2rem',
                  }}
                  onClick={() => {
                    history.push(`/orders`);
                  }}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        );
      })}
    </div>
  );
};

export default Albums;
