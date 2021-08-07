import React from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Albums = ({ allAlbums, currentPage, albumsPerPage, setTotalAlbums, setCurrentAlbum }) => {
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = allAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  setTotalAlbums(allAlbums.length);

  const paginationBasic = (
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
          <Card
            key={album.id}
            style={{
              width: '18rem',
              margin: '1rem',
              background: 'var(--color-tertiary)',
            }}
          >
            <Card.Img
              variant="top"
              src={album.img_url}
              style={{
                width: '10rem',
                height: '10rem',
                margin: '1rem',
                border: 'solid black 1px',
              }}
            />
            <Card.Body
              style={{
                background: 'var(--color-secondary)',
              }}
            >
              <Card.Title>{album.album_name}</Card.Title>
              <Card.Subtitle className="mb-2">{album.artist} ({album.year})</Card.Subtitle>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{album.total_tracks} tracks</ListGroupItem>
              <ListGroupItem>Price: ${album.price / 100}</ListGroupItem>
              <ListGroupItem>
                <Link 
                  className="btn btn-outline-light"
                  role="button"
                  onClick={async () => {
                    await setCurrentAlbum(album)}
                  }
                  to={`/current-album/${album.id}`}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    border: 'solid var(--color-primary) 3px'
                  }}
                  >See Details</Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        );
      })}
    </div>
  );
  return paginationBasic;
};

export default Albums;
