const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./users.js');
const albumsRouter = require('./albums.js');
const genresRouter = require('./genres.js');
const albumGenresRouter = require('./album_genres.js');
const ordersRouter =  require('./orders.js')

apiRouter.get('/health', (req, res, next) => {
  console.log('A request is being made to', req.path);
  res.send({ message: 'All is good on /api/health!' });
  next();
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/albums', albumsRouter);
apiRouter.use('/genres', genresRouter);
apiRouter.use('/album_genres', albumGenresRouter);
apiRouter.use('/orders', ordersRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
