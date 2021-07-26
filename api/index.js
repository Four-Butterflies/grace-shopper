const express           = require('express');
const apiRouter         = express.Router();
const usersRouter       = require('./users.js');
const albumsRouter      = require('./albums.js');
const albumUnitsRouter  = require('./album_units.js');
const ordersRouter      = require('./orders.js');
const reviewsRouter     = require('./reviews') 

apiRouter.get('/health', (req, res, next) => {
  console.log('A request is being made to', req.path);
  res.send({ message: 'All is good on /api/health!' });
  next();
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/albums', albumsRouter);
apiRouter.use('/album_units', albumUnitsRouter);
apiRouter.use('/orders', ordersRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
