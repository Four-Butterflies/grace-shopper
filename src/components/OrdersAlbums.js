import React, { useState, useEffect } from 'react';
import { getAlbumById } from '../api';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const OrdersAlbums = ({ albumId, albumQuantity, albumTotalPrice }) => {
  const [album, setAlbum] = useState();

  useEffect(() => {
    (async () => {
      try {
        const result = await getAlbumById(albumId);
        setAlbum(result[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [albumId]);

  return (
    <div>
      {album ? (
        <Card style={{ width: '18rem', marginBottom: '1rem' }}>
          <Card.Img variant="top" src={album.img_url} alt={album.album_name} />
          <Card.Body>
            <Card.Title>{album.album_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {album.artist} ({album.year})
            </Card.Subtitle>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Quantity: {albumQuantity}</ListGroupItem>
            <ListGroupItem>{album.total_tracks} tracks</ListGroupItem>
            <ListGroupItem>Price: ${albumTotalPrice / 100}</ListGroupItem>
          </ListGroup>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OrdersAlbums;
