const express = require('express');
const chargeRouter = express.Router();
require('dotenv').config();
const {
  getOrderWithDetailsByOrderId,
} = require('./../db/orders.js');

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST
chargeRouter.post('/', async (req, res, next) => {

  //TODO: guard clause for check req.body
 
  const { id } = req.body;

  try {  
    const [{total, id: orderId, details}] = await getOrderWithDetailsByOrderId(1);
    console.log('oderdetails', typeof String(details.length))

    const payment = await stripe.paymentIntents.create({
      amount: total,
      currency: 'USD',
      description: String(details.length) + ' Items', 
      payment_method: id,
      confirm: true,
    });
    console.log('route',payment);

    return res.status(200).send({ orderId, payment });
  } catch (error) {
    console.log('charge', error);

    return next(
       error,
    );
  }
});

module.exports = chargeRouter;
