const express = require('express');
const chargeRouter = express.Router();
require('dotenv').config();
const { getOrderWithDetailsByOrderId } = require('./../db/orders.js');

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST
chargeRouter.post('/', async (req, res, next) => {
  //TODO: guard clause for check req.body

  const { id, orderCheckOut } = req.body;
  
  try {
    const [{ total, id: orderId, details }] =
      await getOrderWithDetailsByOrderId(orderCheckOut);

     let albumNames = {};
    
    details.forEach((detail) => {
      detail.strike_price = `$${detail.strike_price / 100}(ea.)`;

      albumNames[`${detail.album_name} ${detail.strike_price}`]
        ? albumNames[`${detail.album_name} ${detail.strike_price}`]++
        : (albumNames[`${detail.album_name} ${detail.strike_price}`] = 1);
    });

    const albumNameCount = Object.entries(albumNames)
      .map((album) => {
        return album.join(' x ');
      })
      .join(', ');

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
