import React from 'react';
import { Card, Button } from 'react-bootstrap'

const Albums = ({ allAlbums, currentPage, albumsPerPage, setTotalAlbums }) => {

    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = allAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum)

    setTotalAlbums(allAlbums.length)

    const paginationBasic = (
    <div style={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "960px",
        justifyContent: "space-around",
        margin: "auto"
    }}>
        {currentAlbums.map((album) => {
            return (
                <Card
                    key={album.id}
                    style={{
                        width: "12rem",
                        margin: "1rem",
                        background: "var(--color-tertiary)"
                    }}
                >
                    <Card.Img variant="top" src={album.img_url} style={{
                        width: "10rem",
                        height: "10rem",
                        margin: "1rem",
                        border: "solid black 1px"
                    }}/>
                    <Card.Body style={{
                        background: "var(--color-secondary)"
                    }}>
                        <Card.Title>{album.album_name}</Card.Title>
                        <Card.Subtitle className="mb-2">{album.artist}</Card.Subtitle>
                        <Card.Text>${album.price / 100}</Card.Text>
                        <Button 
                            style={{
                                backgroundColor: "var(--color-primary)",
                                border: "solid var(--color-primary) 3px"
                            }}
                            onClick={(event) => {
                                event.preventDefault()
                                
                            }}
                            >Add to Cart</Button>
                    </Card.Body> 
                </Card>
            )
        })}
    </div>
    );

    return (paginationBasic)
};

export default Albums;