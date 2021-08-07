import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { getAlbumById } from '../api';
import { Container } from 'react-bootstrap'

const AlbumInformation = () => {
    let { albumId } = useParams();

    const [album, setAlbum] = useState()

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
                marginTop: '1rem'
            }}>
                <h1>{album.album_name}</h1>
                <h2>{album.artist}</h2>
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
            </Container> 
            : <div>Loading...</div>
            }
            {console.log(album)}
        </div>
    )
}

export default AlbumInformation;