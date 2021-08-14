import React, { useState, useEffect } from 'react';
import { Carousel, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getAlbumById, getMostRecentAlbums } from '../api';

import SingleAlbum from './SingleAlbum.js';

const Home = () => {
  const [index, setIndex] = useState(0);
  const [recentAlbums, setAlbums] = useState([]);
  const [albumOne, setAlbumOne] = useState({});
  const [albumTwo, setAlbumTwo] = useState({});
  const [albumThree, setAlbumThree] = useState({});

  // Get the date so we can change the albums daily
  const date = new Date().getDate();

  const history = useHistory();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    (async () => {
      const albums = await getMostRecentAlbums();
      setAlbums(albums);
      const firstAlbum = await getAlbumById(date);
      setAlbumOne(firstAlbum[0]);
      const secondAlbum = await getAlbumById(date * 2);
      setAlbumTwo(secondAlbum[0]);
      const thirdAlbum = await getAlbumById(date * 3);
      setAlbumThree(thirdAlbum[0]);
    })();
  }, []);

  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        style={{
          height: '50rem',
        }}
      >
        <Carousel.Item>
          <img
            className="background-image"
            src={albumOne.img_url}
            alt={albumOne.album_name}
          />
          <img
            className="content"
            src={albumOne.img_url}
            alt={albumOne.album_name}
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              backdropFilter: 'blur(0px)',
              objectFit: 'none',
            }}
          />
          <Carousel.Caption
            style={{
              marginBottom: '7rem',
            }}
          >
            <h3>{albumOne.artist}</h3>
            <p>{albumOne.album_name}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="background-image"
            src={albumTwo.img_url}
            alt={albumTwo.album_name}
          />
          <img
            className="content"
            src={albumTwo.img_url}
            alt={albumTwo.album_name}
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              backdropFilter: 'blur(0px)',
              objectFit: 'none',
            }}
          />
          <Carousel.Caption
            style={{
              marginBottom: '7rem',
            }}
          >
            <h3>{albumTwo.artist}</h3>
            <p>{albumTwo.album_name}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="background-image"
            src={albumThree.img_url}
            alt={albumThree.album_name}
          />
          <img
            className="content"
            src={albumThree.img_url}
            alt={albumThree.album_name}
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              backdropFilter: 'blur(0px)',
              objectFit: 'none',
            }}
          />
          <Carousel.Caption
            style={{
              marginBottom: '7rem',
            }}
          >
            <h3>{albumThree.artist}</h3>
            <p>{albumThree.album_name}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container fluid>
        <h1 style={{ textAlign: 'center', borderBottom: '1px solid black' }}>
          New Releases (Now in stock!)
        </h1>
        <Container
          fluid
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {recentAlbums.map((album) => {
            return (
              <SingleAlbum
                key={album.album_name + album.artist}
                album={album}
              />
            );
          })}
        </Container>
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="primary"
            style={{
              width: '14rem',
              fontSize: '0.8rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
              margin: '5px',
              height: '2rem',
            }}
            onClick={() => {
              window.scrollTo(0, 0);
              history.push('/albums');
            }}
          >
            See More...
          </Button>
        </span>
      </Container>
    </>
  );
};

export default Home;
