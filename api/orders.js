const express = require('express');
const ordersRouter = express.Router();
const { createOrder, getAllOrders, getOrdersByUserId } = require('./../db/orders');

ordersRouter.get('/', async (req, res) => {
  try {
    const orders = await getAllOrders();
    if (!orders || orders.length === 0) {
      res.status(500).send({
        name: 'Not Orders Found',
        message: 'There are not orders submited at this moment.',
      });
    }
    res.send({ orders });
  } catch (error) {
    console.log(error);
  }
});

ordersRouter.get('/user_orders', async (req, res) => {
    const {userId} = req.body;
  try {
    const orders = await getOrdersByUserId(1);
    if (!orders || orders.length === 0) {
        res.status(500).send({
          name: 'Not Orders Found',
          message: 'There are not orders under this user Id.',
        });
      }
    res.send({ orders });
  } catch (error) {
    console.log(error);
  }
});

ordersRouter.post('/submit_order', async(req, res)=>{
    const { userId, status, total} = req.body

    try {
        const order = await createOrder( {userId, status, total})
        console.log(order);
        res.send({
            order:{id: order.id, userId: order.userId, status: order.status, total: order.total, date: order.date},
            message: 'Your order has been received, Thank you for your purchase',
        })
    } catch (error) {
        console.log(error);
    }
});

module.exports = ordersRouter;