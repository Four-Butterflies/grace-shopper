import React, { useEffect, useState } from 'react';
import { getOrders } from '../api';
import { Container, Card, Button } from 'react-bootstrap';
import OrdersAlbums from './OrdersAlbums';
import { useHistory } from 'react-router-dom';

const Orders = ({setOrderCheckOut}) => {
  const [allOrders, setAllOrders] = useState();
  let quantities = [];

  const history = useHistory()

  useEffect(() => {
    (async () => {
      try {
        const results = await getOrders();
        setAllOrders(results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

const sendOrder = (order) => {
  setOrderCheckOut(order)
}
  return (
    <Container fluid>
      <Container>
        {allOrders ? (
          allOrders.map((order) => {
            // Have to go through the orders.details array and assign quantity to each item
            // for each assign spot into new array of objects, but one that contains a quantity
            // if it is a new object, make new spot in the array and set quantity to 1
            // if it is an object with a repeated albumId, increase quantity by 1 and add price to itself

            order.details.forEach((album) => {
              if (!quantities.find((i) => i.albumId === album.albumId)) {
                quantities.push({
                  albumId: album.albumId,
                  total_price: album.strike_price,
                  quantity: 1,
                });
              } else {
                let foundAlbum = quantities.find(
                  (i) => i.albumId === album.albumId
                );
                foundAlbum.quantity++;
                foundAlbum.total_price += album.strike_price;
              }
            });

            return (
              <Card style={{ width: '70rem' }} key={order.id}>
                <Card.Body>
                  {order.status === 'in progress' ? <Card.Title style={{
                    fontSize: '2rem'
                  }}>Your Cart</Card.Title> : <Card.Title>{order.status}</Card.Title>}
                  <Container
                    fluid
                  >
                    {order.details.length !== 0 ? (
                      quantities.map((album) => (
                        <OrdersAlbums
                          albumId={album.albumId}
                          albumQuantity={album.quantity}
                          albumTotalPrice={album.total_price}
                          setAllOrders={setAllOrders}
                        />
                      ))
                    ) : (
                      <div>No Orders</div>
                    )}
                  </Container>
                  <Card.Title>Total: ${order.total / 100}</Card.Title>
                  {order.status === 'in progress' ? (
                    <Button variant="primary" onClick={ async() =>{
                        await sendOrder(order.id)
                        history.push('/checkout')
                    } }>Complete Order</Button> /* order.id -- send order ID to */
                  ) : (
                    <Button variant="primary">See Details</Button>
                  )}
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <div>There is nothing in your cart!</div>
        )}
      </Container>
    </Container>
  );
};

export default Orders;
