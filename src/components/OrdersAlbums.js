import React, { useState, useEffect } from 'react';
import { getAlbumById, deleteAlbumUnit } from '../api';
import { Card, ListGroup, ListGroupItem, CloseButton } from 'react-bootstrap';

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
        <Card style={{ 
          width: 'auto',
          margin: '1rem'
          }}>
          <Card.Header style={{ 
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <h5>{album.album_name}</h5>
            <CloseButton 
              // onClick={(event) => {
              //   event.preventDefault()
              //   console.log('from the component', album.id)
              //   deleteAlbumUnit(album.id)
              // }}
            />
          </Card.Header>
          <div style={{ display: 'flex'}}>
            <Card.Img variant="top" src={album.img_url} alt={album.album_name} style={{ width: '11rem' }}/>
            <div style={{ width: '100%' }}>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  {album.artist} ({album.year})
                </Card.Subtitle>
              </Card.Body>
              <ListGroup className="list-group-flush" >
                <ListGroupItem>Quantity: {albumQuantity}</ListGroupItem>
                <ListGroupItem>{album.total_tracks} tracks</ListGroupItem>
                <ListGroupItem>Price: ${albumTotalPrice / 100}</ListGroupItem>
              </ListGroup>
            </div>
          </div>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OrdersAlbums;
