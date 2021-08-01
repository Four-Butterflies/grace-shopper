import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getAlbumById } from '../api';

const SingleAlbum = () => {
  const [singleAlbum, setSingleAlbum] = useState({});

  useEffect(() => {
    const mount = async () => {
      const singleAlbum = await getAlbumById(7);
      setSingleAlbum(singleAlbum[0]);
    };
    mount();
  }, []);

  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img             
            variant="top"
            src={singleAlbum.img_url}
            alt={singleAlbum.album_name}            
          />
        <Card.Body>
            <Card.Title>{singleAlbum.album_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
                {singleAlbum.artist} ({singleAlbum.year})
            </Card.Subtitle>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem>{singleAlbum.total_tracks} tracks</ListGroupItem>
            <ListGroupItem>Price: ${singleAlbum.price}</ListGroupItem>
        </ListGroup>
        <Card.Body>
            <Card.Link href="#">See Reviews</Card.Link>
            <Card.Link href="#">Add to Cart</Card.Link>
        </Card.Body>
        </Card>
    
  );
};

export default SingleAlbum;
