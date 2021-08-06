import React, { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAlbumById, getMostRecentAlbums } from '../api';

import SingleAlbum from './SingleAlbum.js';

// IDEA: CHANGE THE RANDOM ALBUMS DAILY

const Home = () => {
  const [index, setIndex] = useState(0);
  const [recentAlbums, setAlbums] = useState([]);
  const [albumOne, setAlbumOne] = useState({});
  const [albumTwo, setAlbumTwo] = useState({});
  const [albumThree, setAlbumThree] = useState({});

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    (async () => {
      const albums = await getMostRecentAlbums();
      setAlbums(albums);
      const firstAlbum = await getAlbumById(1);
      setAlbumOne(firstAlbum[0]);
      const secondAlbum = await getAlbumById(7);
      setAlbumTwo(secondAlbum[0]);
      const thirdAlbum = await getAlbumById(3);
      setAlbumThree(thirdAlbum[0]);
    })();
  }, []);

  // console.log(albumOne, albumTwo, albumThree);

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
        <h1>New Releases:</h1>
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
        <Link to={'/albums/#'}>See More...</Link>
      </Container>
    </>
  );
};

export default Home;
