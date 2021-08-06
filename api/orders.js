const express = require('express');
const ordersRouter = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrdersWithDetailsByUserId,
  getOrderWithDetailsByOrderId,
} = require('./../db/orders.js');

// GET
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

ordersRouter.get('/details/:orderId', async (req, res) => {

  if (Object.keys(req.body).length === 0) { 
    return res.status(400).send({
      name: 'InformationRequired',
      message: 'Please provide orderId to get your order deatails.',
    });
  }

  const { orderId } = req.params;

  try {
    const order = await getOrderWithDetailsByOrderId(orderId);
    if (!order || order.length === 0) {
      res.status(500).send({
        name: 'Orders Not Found',
        message: 'There are not orders under this user Id.',
      });
    }

    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

ordersRouter.get('/user_orders/:userId', async (req, res) => {
  if (Object.keys(req.params).length === 0) { 
    return res.status(400).send({
      name: 'InformationRequired',
      message: 'Please provide userId to get your order deatails.',
    });
  }

  const { userId } = req.params;

  try {
    const orders = await getOrdersWithDetailsByUserId(userId);
    if (!orders || orders.length === 0) {
      res.status(500).send({
        name: 'Orders Not Found',
        message: 'There are not orders under this user Id.',
      });
    }

    res.send(orders);
  } catch (error) {
    console.log(error);
  }
});

// POST
ordersRouter.post('/submit_order', async (req, res) => {

  if (Object.keys(req.body).length < 3) { 
    return res.status(400).send({
      name: 'InformationRequired',
      message: 'Please provide userId, status and total to submit your order.',
    });
  }

  const { userId, status, total } = req.body;

  try {
    const order = await createOrder({ userId, status, total });

    res.send({
      order: {
        id: order.id,
        userId: order.userId,
        status: order.status,
        total: order.total,
        date: order.date,
      },
      message: 'Your order has been received, Thank you for your purchase',
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = ordersRouter;
