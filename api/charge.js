const express = require('express');
const chargeRouter = express.Router();
require('dotenv').config();
const {
  getOrderWithDetailsByOrderId,
} = require('./../db/orders.js');

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST
chargeRouter.post('/', async (req, res) => {

  //TODO: guard clause for check req.body
 
  const { id } = req.body;

  try {  
    const [{total, id: orderId, details:[all]}] = await getOrderWithDetailsByOrderId(1);
    console.log('oderdetails', all)

    const payment = await stripe.paymentIntents.create({
      amount: total,
      currency: 'USD',
      description: 'add details as strings', //TODO: add details as string.
      payment_method: id,
      confirm: true,
    });
    console.log('route',payment);

    return res.status(200).send({ orderId, payment });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = chargeRouter;
