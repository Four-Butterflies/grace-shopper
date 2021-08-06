const express = require('express');
const chargeRouter = express.Router();
require('dotenv').config();
const { getOrderWithDetailsByOrderId } = require('./../db/orders.js');

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST
chargeRouter.post('/', async (req, res, next) => {
  //TODO: guard clause for check req.body

  const { id } = req.body;

  try {
    const [{ total, id: orderId, details }] =
      await getOrderWithDetailsByOrderId(1);

    let albumNames = {};

    details.forEach((detail) => {
      albumNames[`${detail.album_name}`]
        ? albumNames[`${detail.album_name}`]++
        : (albumNames[`${detail.album_name}`] = 1);
    });

    const albumNameCount = Object.entries(albumNames)
      .map((line) => {
        return line.join(' = ');
      })
      .join(' , ');

    const payment = await stripe.paymentIntents.create({
      amount: total,
      currency: 'USD',
      description: albumNameCount,
      payment_method: id,
      confirm: true,
    });

    return res.status(200).send({ orderId, payment });
  } catch (error) {
    return next(error);
  }
});

module.exports = chargeRouter;
