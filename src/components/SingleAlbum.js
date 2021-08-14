import React from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SingleAlbum = ({ album }) => {
  const { album_name, artist, year, price, img_url, total_tracks } = album;

  const history = useHistory();

  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Img variant="top" src={img_url} alt={album_name} />
      <Card.Body>
        <Card.Title>{album_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {artist} ({year})
        </Card.Subtitle>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{total_tracks} tracks</ListGroupItem>
        <ListGroupItem>Price: ${price / 100}</ListGroupItem>
        <ListGroupItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="primary"
            style={{
              width: '14rem',
              fontSize: '0.8rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
              margin: '5px',
              height: '2rem',
            }}
            onClick={async () => {
              history.push(`/albums/${album.id}`);
            }}
          >
            See Details
          </Button>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default SingleAlbum;
