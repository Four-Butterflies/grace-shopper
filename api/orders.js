const express = require('express');
const ordersRouter = express.Router();
const { getAllOrders, getOrdersByUserId } = require('./../db/orders');

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
    const orders = await getOrdersByUserId(51);
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

module.exports = ordersRouter;
