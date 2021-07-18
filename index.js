const express = require('express');
const morgan = require('morgan');
const client = require('./db/client.js');
const apiRouter = require('./api');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

// here's our static files
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use('/api', apiRouter);

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const startServer = async () => {
  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs!\n', error);
  }

  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}!`);
  });
};

startServer();
