import React from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const Albums = ({ allAlbums, currentPage, albumsPerPage, setTotalAlbums }) => {
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = allAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  setTotalAlbums(allAlbums.length);

  const paginationBasic = (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '960px',
        justifyContent: 'space-around',
        margin: 'auto',
      }}
    >
      {currentAlbums.map((album) => {
            return (
                <Card
                    key={album.id}
                    style={{
                        width: "18rem",
                        margin: "1rem",
                    }}
                >
                    <Card.Img variant="top" src={album.img_url} alt={album.album_name} style={{
                        width: "10rem",
                        height: "10rem",
                        margin: "1rem",
                        border: "solid black 1px"
                    }}/>
                   <Card.Body>
                        <Card.Title>{album.album_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                        {album.artist} ({album.year})
                        </Card.Subtitle>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{album.total_tracks} tracks</ListGroupItem>
                        <ListGroupItem>Price: ${album.price / 100}</ListGroupItem>
                        <ListGroupItem>
                            <Button 
                                style={{
                                    width: "50%",
                                    backgroundColor: "var(--color-primary)",
                                    border: "solid var(--color-primary) 3px"
                                }}
                                onClick={(event) => {
                                    event.preventDefault()
                                    
                                }}
                                >See Reviews</Button>
                            <Button 
                                style={{
                                    width: "50%",
                                    backgroundColor: "var(--color-primary)",
                                    border: "solid var(--color-primary) 3px"
                                }}
                                onClick={(event) => {
                                    event.preventDefault()
                                    
                                }}
                                >Add to Cart</Button>    
                        </ListGroupItem>
                    </ListGroup>
                </Card>
        );
      })}
    </div>
  );

  return paginationBasic;
};

export default Albums;
