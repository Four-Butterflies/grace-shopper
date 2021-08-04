// Intializes and seeds DB
const client = require('./client');
const { createAlbums } = require('./albums.js');
const { createAlbumUnit } = require('./album_units');
const { createOrder } = require('./orders.js');
const { createReview } = require('./reviews.js');
const { createUser } = require('./users.js');

const {
  albums,
  users,
  reviews,
  orders,
  albumUnits,
} = require('./seeddata.json');

async function buildTables() {
  try {
    console.log('Building tables...');

    await client.query(`
    DROP TABLE IF EXISTS album_units CASCADE;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS albums CASCADE;

    CREATE TABLE albums (
      id SERIAL PRIMARY KEY,
      album_name varchar(255) NOT NULL,
      artist varchar(255) NOT NULL,
      year INT,
      genres text[],
      price INT DEFAULT 1999,
      quantity INT DEFAULT 0,
      reorder_number INT DEFAULT 0,
      img_url text DEFAULT 'https://cdn4.vectorstock.com/i/thumb-large/82/48/vinyl-record-blank-realistic-vinyl-disc-mockup-on-vector-17128248.jpg',
      spotify text,
      total_tracks INT
    );
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      isAdmin BOOLEAN DEFAULT false,
      password varchar(255) NOT NULL,
      email varchar(255) UNIQUE NOT NULL
    );
    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      review TEXT,
      rating BOOLEAN DEFAULT true,
      date DATE DEFAULT CURRENT_DATE,
      "albumId" INTEGER REFERENCES albums(id) ON DELETE CASCADE NOT NULL,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
    );
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY, 
      "userId" INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
      status varchar(255) NOT NULL,
      total INT,
      date DATE DEFAULT CURRENT_DATE
    );
    CREATE TABLE album_units (
      id SERIAL PRIMARY KEY, 
      "albumId" INTEGER REFERENCES albums(id) ON DELETE CASCADE NOT NULL,
      "orderId" INTEGER REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
      strike_price INT
    );
  `);

    console.log('Tables Built!');
  } catch (error) {
    throw error;
  }
}

// CREATE INITIAL USERS
async function createInitialUsers() {
  try {
    console.log('Starting to create users...');

    await Promise.all(
      users.map(async (user) => {
        await createUser(user);
      })
    );

    console.log('Finished creating users!');
  } catch (error) {
    throw error;
  }
}

// CREATE INITIAL ALBUMS
async function createInitialAlbums() {
  try {
    console.log('Starting to create albums...');

    await Promise.all(
      albums.map(async (album) => {
        await createAlbums(album);
      })
    );

    console.log('Finished creating albums');
  } catch (error) {
    throw error;
  }
}

//CREATE INITIAL ORDERS
async function createInitialOrders() {
  try {
    console.log('Starting to create orders...');

    await Promise.all(
      orders.map(async (order) => {
        await createOrder(order);
      })
    );

    console.log('Finished creating orders');
  } catch (error) {
    throw error;
  }
}

// CREATE INITIAL ALBUM UNITS
async function createInitialAlbumUnits() {
  try {
    console.log('Starting to create albumUnits...');

    await Promise.all(
      albumUnits.map(async (albumUnit) => {
        await createAlbumUnit(albumUnit);
      })
    );

    console.log('Finished creating albumUnits');
  } catch (error) {
    console.log(error);
  }
}

// CREATE INITIAL REVIEWS
async function createInitialReviews() {
  try {
    console.log('Starting to create reviews...');

    await Promise.all(
      reviews.map(async (review) => {
        await createReview(review);
      })
    );

    console.log('Finished creating reviews');
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await buildTables();
    await createInitialAlbums();
    await createInitialUsers();
    await createInitialOrders();
    await createInitialAlbumUnits();
    await createInitialReviews();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
