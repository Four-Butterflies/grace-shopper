import React, { useEffect, useState } from 'react';
import { getOrders } from '../api'
import { Container, Card, Button} from 'react-bootstrap';
import OrdersAlbums from './OrdersAlbums'

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

    return (
        <Container fluid>
            <h1>Your Cart:</h1>
            <Container>
                {allOrders ? allOrders.map((order) => {
                    return (
                        <Card style={{ width: '70rem' }} key={order.id}>
                        <Card.Body>
                          <Card.Title>{order.status}</Card.Title>
                          <Card.Text>{order.status}</Card.Text>
                          <Container
                            fluid
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-evenly',
                            }}
                            >
                            {order.details.map((album) => 
                                <OrdersAlbums 
                                    albumId={album.albumId}
                                />)
                                }
                            </Container>
                          {order.status === 'in progress' ? <Button variant="primary">Complete Order</Button> : <Button variant="primary">See Details</Button>}
                        </Card.Body>
                      </Card>
                    ) 
                }) : <div>There is nothing in your cart!</div> }
            </Container>
        </Container>
    )
}

export default Orders;