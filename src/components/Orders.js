import React, { useEffect, useState } from 'react';
import { getOrders, getAlbumById } from '../api'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SingleAlbum from './SingleAlbum'

const Orders = () => {

    const [allOrders, setAllOrders] = useState([{}])
    const [albumArray, setAlbumArray] = useState([]);

    useEffect(() => {
        const mount = async () => {
            const response = await getOrders()
            setAllOrders(response)
        }

        mount()
    }, [])

    console.log(allOrders[0].details)



    

    // useEffect(() => {
    //     allOrders.forEach(async (album) => {
    //         try{
    //             const albumData = await getAlbumById(album.id)
    //             albumArray.push(albumData[0])
    //         } catch(error) {
    //             console.log(error)
    //         }
    //     })
    //     console.log(albumArray)
    //     setAlbumArray(albumArray)
    // }, [allOrders])

    // console.log(albumArray[0])

    return (
        <Container fluid>
            <h1>Your Cart:</h1>
            <Container
                fluid
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
            }}>
                {albumArray}
            </Container>
            <Link to={'/albums'}>See More...</Link>
        </Container>
    )
}

export default Orders;

// get all the orders
// get all the 'in progress orders'
// use single card to show orders