import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { getAlbumById } from '../api';

// IDEA: CHANGE THE RANDOM ALBUMS DAILY

const Home = () => {
  const [index, setIndex] = useState(0);
  const [albumOne, setAlbumOne] = useState({})
  const [albumTwo, setAlbumTwo] = useState({})
  const [albumThree, setAlbumThree] = useState({})

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  
  useEffect(() => {
    const mount = async () => {
      const firstAlbum = await getAlbumById(1)
      setAlbumOne(firstAlbum[0])
      const secondAlbum = await getAlbumById(7)
      setAlbumTwo(secondAlbum[0])
      const thridAlbum = await getAlbumById(3)
      setAlbumThree(thridAlbum[0])
    }
    mount()
  }, [])

  console.log(albumOne, albumTwo, albumThree)

  return (
      <Carousel activeIndex={index} onSelect={handleSelect} style={{
        height: "50rem",
      }}>
        <Carousel.Item >
          <img class="background-image" src={albumOne.img_url} alt={albumOne.album_name}/>
          <img class="content"
              src={albumOne.img_url}
              alt={albumOne.album_name}
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                backdropFilter: "blur(0px)",
                objectFit: "none"
              }}
            />
            <Carousel.Caption style={{
              marginBottom: "7rem"
            }}>
              <h3>{albumOne.artist}</h3>
              <p>{albumOne.album_name}</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img class="background-image" src={albumTwo.img_url} alt={albumTwo.album_name}/>
          <img class="content"
            src={albumTwo.img_url}
            alt={albumTwo.album_name}
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              backdropFilter: "blur(0px)",
              objectFit: "none"
            }}
          />
          <Carousel.Caption style={{
              marginBottom: "7rem"
            }}>
            <h3>{albumTwo.artist}</h3>
            <p>{albumTwo.album_name}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img class="background-image" src={albumThree.img_url} alt={albumThree.album_name}/>
          <img class="content"
            src={albumThree.img_url}
            alt={albumThree.album_name}
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              backdropFilter: "blur(0px)",
              objectFit: "none"
            }}
          />
          <Carousel.Caption style={{
              marginBottom: "7rem"
          }}>
            <h3>{albumThree.artist}</h3>
            <p>{albumThree.album_name}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
  );
}

export default Home;