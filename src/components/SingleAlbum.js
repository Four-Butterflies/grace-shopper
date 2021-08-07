import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

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
      <Card.Body>
        <Card.Link href="#">See More Details</Card.Link>
        <Card.Link href="#">Add to Cart</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default SingleAlbum;
