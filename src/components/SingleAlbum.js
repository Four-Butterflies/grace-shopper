import React from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const SingleAlbum = ({ album }) => {
  const { album_name, artist, year, price, img_url, total_tracks } = album;

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
      </ListGroup>
      <ListGroupItem>
        <Button
          variant="primary"
          style={{
            width: '100px',
            fontSize: '0.8rem',
            textAlign: 'center',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
            fontWeight: '450',
            textTransform: 'uppercase',
            textDecoration: 'none',
            WebkitTransition: 'all 150ms ease',
            transition: 'all 150ms ease',
            margin: '5px',
            height: '2rem',
          }}
          href={`/albums/${album.id}`}
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
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
            fontWeight: '450',
            textTransform: 'uppercase',
            textDecoration: 'none',
            WebkitTransition: 'all 150ms ease',
            transition: 'all 150ms ease',
            margin: '5px',
            height: '2rem',
          }}
          to={`/orders`}
        >
          Add to Cart
        </Button>
      </ListGroupItem>
    </Card>
  );
};

export default SingleAlbum;
