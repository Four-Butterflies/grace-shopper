// code to build and initialize DB goes here
const client = require('./client');
const { createAlbums } = require('./albums.js');
const { createAlbumUnit } = require('./album_units');
const { createOrder } = require('./orders.js');
const { createReview } = require('./reviews.js');
const { createUser, getAllUsers } = require('./users.js');

// SEED DATA
const albums = require('./seeddata.json');
const users = require('./usersseeddata.json');
const reviews = require('./reviews.json');

async function buildTables() {
  try {
    console.log('Building tables...');

    // build tables in correct order

    await client.query(`
    DROP TABLE IF EXISTS album_units CASCADE;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS genre_albums;
    DROP TABLE IF EXISTS genres;
    DROP TABLE IF EXISTS albums CASCADE;

    CREATE TABLE albums (
      id SERIAL PRIMARY KEY,
      album_name varchar(255) NOT NULL,
      artist varchar(255) NOT NULL,
      year INT,
      genres text,
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
      isAdmin BOOLEAN DEFAULT TRUE,
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
        const { username, password, email } = user;

        await createUser({
          username,
          password,
          email,
        });
      })
    );

    console.log('Finished creating users!');
  } catch (error) {
    throw error;
  }
}

// CREATE INITIAL ALBUMS, ALSO CREATES GENRES AND ALBUM GENRE RELATIONS
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

//CREATE INITIAL Orders
async function createInitialOrders() {
  try {
    console.log('Starting to create Initial Orders...');
    const users = await getAllUsers();
    const ordersTocreate = [
      {
        userId: 1,
        status: 'in progress',
        total: 1299,
      },
      {
        userId: 2,
        status: 'in progress',
        total: 1399,
      },
      {
        userId: 3,
        status: 'in progress',
        total: 1099,
      },
      {
        userId: 1,
        status: 'Delivered',
        total: 2000,
      },
      {
        userId: 4,
        status: 'Cancelled',
        total: 599,
      },
      {
        userId: 4,
        status: 'in progress',
        total: 599,
      },
      {
        userId: 3,
        status: 'in progress',
        total: 4999,
      },
      {
        userId: 5,
        status: 'delivered',
        total: 9999,
      },
    ];
    const orders = await Promise.all(
      ordersTocreate.map((order) => createOrder(order))
    );
    // console.log('Orders created: ', orders);
    console.log('Finished creating Initial Orders');
  } catch (error) {
    throw error;
  }
}

// CREATE INITIAL album-units
async function createInitialAlbumUnits() {
  try {
    console.log('Starting to create Initial AlbumUnits...');

    const albumUntsToCreate = [
      {
        albumId: 10,
        orderId: 1,
        strikePrice: 1999,
      },
      {
        albumId: 20,
        orderId: 1,
        strikePrice: 1499,
      },
      {
        albumId: 30,
        orderId: 2,
        strikePrice: 599,
      },
      {
        albumId: 4,
        orderId: 3,
        strikePrice: 699,
      },
      {
        albumId: 6,
        orderId: 3,
        strikePrice: 1699,
      },
    ];
    const albumUnits = await Promise.all(
      albumUntsToCreate.map((au) => createAlbumUnit(au))
    );
    // console.log('AlbumUnits created: ', albumUnits);
    console.log('Finished creating Initial AlbumUnits');
  } catch (error) {
    console.log(error);
  }
}

// CREATE INITIAL REVIEWS
async function createInitialReviews() {
  try {
    console.log('Starting to create reviews...');
    await Promise.all(
      reviews.map(async (eachReview) => {
        const { review, rating, albumId, userId } = eachReview;

        await createReview({
          review,
          rating,
          albumId,
          userId,
        });
      })
    );

    console.log('Finished creating reviews!');
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
