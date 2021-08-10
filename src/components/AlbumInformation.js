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
                            return (<Link 
                                className="btn btn-outline-light"
                                role="button"
                                to='/'
                                style={{
                                    backgroundColor: 'var(--color-primary)',
                                    border: 'solid var(--color-primary) 3px',
                                    margin: '0.5rem'
                                }}
                            >{genre}</Link>)
                        })}
                    </div>
                    <p>${album.price / 100}</p>
                    <h2>Reviews</h2>
                    {album.reviews.map((review) => {
                        return (
                            <div>
                                <h3>{review.rating.toString()}</h3>
                                <p>{review.date}</p>
                                <p>{review.review}</p>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h1>{album.album_name}</h1>
                    <h2>{album.artist}</h2>
                    <p>Quantity</p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {quantity === 1 ? 
                        <Button disabled style={{
                            backgroundColor: 'var(--color-primary)',
                            border: 'solid var(--color-primary) 3px',
                            margin: '0.5rem'
                        }}></Button> : 
                        <Button 
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                border: 'solid var(--color-primary) 3px',
                                margin: '0.5rem'
                            }}
                            onClick={(event) => {
                                event.preventDefault()
                                setQuantity(quantity - 1)}}
                        >-</Button>}
                        <p>{quantity}</p>
                        <Button 
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                border: 'solid var(--color-primary) 3px',
                                margin: '0.5rem'
                            }}
                            onClick={(event) => {
                                event.preventDefault()
                                setQuantity(quantity + 1)}}
                        >+</Button>
                    </div>
                    <Button
                        style={{
                            backgroundColor: 'var(--color-tertiary)',
                            border: 'solid var(--color-tertiary) 3px',
                            margin: '0.5rem'
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