import React, { useEffect, useState } from 'react';
import { getOrders, getAlbumById } from '../api'
import { Container, Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SingleAlbum from './SingleAlbum'

const Orders = () => {
    const [allOrders, setAllOrders] = useState()

    useEffect(() => {
        const mountOrders = async () => {
            try {
                const results = await getOrders()
                setAllOrders(results)
            } catch(error) {
                console.log(error)
            }
        }
        mountOrders()
    }, [])

    // console.log(allOrders)
    if (allOrders) {
        console.log(allOrders)
        // for each
        // .details
    }

    return (
        <Container fluid>
            <h1>Your Cart:</h1>
            <Container>
                {allOrders ? allOrders.map((order) => {
                    return (
                        <Card style={{ width: '40rem' }} key={order.id}>
                        <Card.Body>
                          <Card.Title>{order.status}</Card.Title>
                          <Card.Text>{order.status}</Card.Text>
                          {order.details.map((album) => 
                            <Card.Text>{album.albumId}</Card.Text>)}
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                    ) 
                }) : <div>There is nothing in your cart!</div> }
            </Container>
            <Link to={'/albums'}>See More...</Link>
        </Container>
    )
}

export default Orders;

// get all the orders
// get all the 'in progress orders'
// use single card to show orders