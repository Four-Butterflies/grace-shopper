const express = require('express');
const chargeRouter = express.Router();
require('dotenv').config();

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST
chargeRouter.post('/', async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Your Album',
      payment_method: id,
      confirm: true,
    });
    console.log(payment);

    return res.status(200).send({ confirmation: 'add order ID here' });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = chargeRouter;
