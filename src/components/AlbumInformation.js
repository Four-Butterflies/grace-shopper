import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { getAlbumById, createAlbumUnit, getOrders } from '../api';
import { Container, Button } from 'react-bootstrap'

const AlbumInformation = () => {
    let { albumId } = useParams();

    const [album, setAlbum] = useState()
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const mount = async () => {
            const result = await getAlbumById(albumId)
            setAlbum(result[0])
        }
        mount()
    }, [])
    

    //TODO: put in username for reviews
    //TODO: add button to checkout

    return (
        <div>
            {album ? 
            <Container style={{
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'space-evenly'
            }}>
                <div>
                    <img src={album.img_url}></img>
                    <div>
                        {album.genres.map((genre) => {
                            return (
                            <Button 
                                href="/"
                                variant="primary"
                                style={{                  
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                webkitTransition: 'all 150ms ease',
                                transition: 'all 150ms ease',
                                margin: '10px',
                                height: '2.5rem',
                                 }}
                            >{genre}</Button>)
                        })}
                    </div>
                    <h3>${album.price / 100}</h3>
                    <br></br>
                    <h2 style={{
                        borderBottom: '1px solid black',
                    }}>Reviews</h2>
                    {album.reviews.map((review) => {
                        var date = new Date(review.date);

                        var year = date.getFullYear();
                        var month = date.getMonth()+1;
                        var day = date.getDate();
                        
                        if (day < 10) {
                          day = '0' + day;
                        }
                        if (month < 10) {
                          month = '0' + month;
                        }
                        
                        var formattedDate = month + '-' + day + '-' + year
                        return (
                            <div
                                style={{
                                border: '1px solid black'
                                }}>
                                <p style={{textAlign:'right',}}>{formattedDate}</p>
                                <h3 style={{textAlign:'right',}}>{review.rating.toString()}</h3>
                                <p>{review.review}</p>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h1 style={{
                        textAlign: 'left',
                    }}>{album.album_name}</h1>
                    <h2 style={{
                        fontStyle:'italic',
                        textAlign: 'left',
                        borderBottom: 'solid 1px black'
                    }} >{album.artist}</h2>
                    <p>Quantity</p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {quantity === 1 ? 
                        <Button disabled                                
                            variant="primary"
                            style={{                  
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            webkitTransition: 'all 150ms ease',
                            transition: 'all 150ms ease',
                            margin: '10px',
                            height: '2.5rem',
                        }}>

                        </Button> : 
                        <Button 
                                variant="primary"
                                style={{                  
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                webkitTransition: 'all 150ms ease',
                                transition: 'all 150ms ease',
                                margin: '10px',
                                height: '2.5rem',
                                 }}
                            onClick={(event) => {
                                event.preventDefault()
                                setQuantity(quantity - 1)}}
                        >-</Button>}
                        <p>{quantity}</p>
                        <Button 
                                variant="primary"
                                style={{                  
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                webkitTransition: 'all 150ms ease',
                                transition: 'all 150ms ease',
                                margin: '10px',
                                height: '2.5rem',
                                 }}
                            onClick={(event) => {
                                event.preventDefault()
                                setQuantity(quantity + 1)}}
                        >+</Button>
                    </div>
                    <Button
                                variant="primary"
                                style={{                  
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 4px 4px 8px #186AE7',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                webkitTransition: 'all 150ms ease',
                                transition: 'all 150ms ease',
                                margin: '10px',
                                height: '2.5rem',
                                 }}
                        onClick={async (event) => {
                            event.preventDefault()
                            const orders = await getOrders()
                            const inProgressOrder = orders.find(i => i.status === 'in progress')
                            if (!inProgressOrder) {
                                console.log('there is no order! please create one')
                            } else {
                                for(let i = 0; i < quantity; i++) { // will make multiple album_units
                                    createAlbumUnit(album.id, inProgressOrder.id, album.price)
                                }
                            }
                        }}
                    >Add to Cart</Button>
                </div>
            </Container> 
            : <div>Loading...</div>
            }
            {console.log(album)}
        </div>
    )
}

export default AlbumInformation;