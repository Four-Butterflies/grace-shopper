const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./users.js');
const albumsRouter = require('./albums.js');
const albumUnitsRouter = require('./album_units.js');
const ordersRouter = require('./orders.js');
const reviewsRouter = require('./reviews');
const chargeRouter = require('./charge');

apiRouter.get('/health', (req, res, next) => {
  res.send({ message: 'All is good on /api/health!' });
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/albums', albumsRouter);
apiRouter.use('/album_units', albumUnitsRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/charge', chargeRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
  // Better debug errors
  // next(error);
});

module.exports = apiRouter;
