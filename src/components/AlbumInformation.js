import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumById, createAlbumUnit, getOrders } from '../api';
import { Container, Button } from 'react-bootstrap';

const AlbumInformation = () => {
  let { albumId } = useParams();

  const [album, setAlbum] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    (async () => {
      const result = await getAlbumById(albumId);
      setAlbum(result[0]);
    })();
  }, [albumId]);

  //TODO: put in username for reviews
  //TODO: add button to checkout

  return (
    <div>
      {album ? (
        <Container
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <div>
            <img src={album.img_url} alt={`${album.album_name}`}></img>
            <div>
              {album.genres.map((genre) => {
                return (
                  <Button
                    variant="primary"
                    style={{
                      boxShadow:
                        '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      WebkitTransition: 'all 150ms ease',
                      transition: 'all 150ms ease',
                      margin: '10px',
                      height: '2.5rem',
                    }}
                    key={genre}
                  >
                    {genre}
                  </Button>
                );
              })}
            </div>
            <h3>${album.price / 100}</h3>
            <br></br>
            <h2
              style={{
                borderBottom: '1px solid black',
              }}
            >
              Reviews
            </h2>
            {album.reviews.map((review) => {
              const date = new Date(review.date);
              const year = date.getFullYear();
              const month =
                date.getMonth() + 1 < 10
                  ? '0' + (date.getMonth() + 1)
                  : date.getMonth() + 1;
              const day =
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

              return (
                <div
                  style={{
                    border: '1px solid black',
                  }}
                  key={date}
                >
                  <p
                    style={{ textAlign: 'right' }}
                  >{`${month} - ${day} - ${year}`}</p>
                  <h3 style={{ textAlign: 'right' }}>
                    {review.rating ? '👍' : '👎'}
                  </h3>
                  <p>{review.review}</p>
                </div>
              );
            })}
          </div>
          <div>
            <h1
              style={{
                textAlign: 'left',
              }}
            >
              {album.album_name}
            </h1>
            <h2
              style={{
                fontStyle: 'italic',
                textAlign: 'left',
                borderBottom: 'solid 1px black',
              }}
            >
              {album.artist}
            </h2>
            <p>Quantity</p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {quantity === 1 ? (
                <Button
                  disabled
                  variant="primary"
                  style={{
                    boxShadow:
                      '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    WebkitTransition: 'all 150ms ease',
                    transition: 'all 150ms ease',
                    margin: '10px',
                    height: '2.5rem',
                  }}
                >
                  -
                </Button>
              ) : (
                <Button
                  variant="primary"
                  style={{
                    boxShadow:
                      '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    WebkitTransition: 'all 150ms ease',
                    transition: 'all 150ms ease',
                    margin: '10px',
                    height: '2.5rem',
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    setQuantity(quantity - 1);
                  }}
                >
                  -
                </Button>
              )}
              {quantity}
              <Button
                variant="primary"
                style={{
                  boxShadow:
                    '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  WebkitTransition: 'all 150ms ease',
                  transition: 'all 150ms ease',
                  margin: '10px',
                  height: '2.5rem',
                }}
                onClick={(event) => {
                  event.preventDefault();
                  setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </div>
            <Button
              variant="primary"
              style={{
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                fontWeight: '600',
                textTransform: 'uppercase',
                textDecoration: 'none',
                WebkitTransition: 'all 150ms ease',
                transition: 'all 150ms ease',
                margin: '10px',
                height: '2.5rem',
              }}
              onClick={async (event) => {
                event.preventDefault();
                const orders = await getOrders();
                const inProgressOrder = orders.find(
                  (i) => i.status === 'in progress'
                );
                if (!inProgressOrder) {
                  console.log('there is no order! please create one');
                } else {
                  for (let i = 0; i < quantity; i++) {
                    // will make multiple album_units
                    createAlbumUnit(album.id, inProgressOrder.id, album.price);
                  }
                }
              }}
            >
              Add to Cart
            </Button>
          </div>
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AlbumInformation;
