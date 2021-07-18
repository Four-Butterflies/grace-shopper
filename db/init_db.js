// code to build and initialize DB goes here
const client = require('./client');

const {
  createAlbums,
  createGenres,
  createAlbumGenres,
  createUser,
} = require('../db');

const albums = require('./seeddata.json');
const users = require('./usersseeddata.json')

async function buildTables() {
  try {
    console.log('Building tables...');

    // build tables in correct order

    await client.query(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS genre_albums;
    DROP TABLE IF EXISTS genres;
    DROP TABLE IF EXISTS albums;

    CREATE TABLE albums (
      id SERIAL PRIMARY KEY,
      album_name varchar(255) NOT NULL,
      artist varchar(255) NOT NULL,
      year INT,
      price INT DEFAULT 1999,
      quantity INT DEFAULT 0,
      reorder_number INT DEFAULT 0,
      img_url text DEFAULT 'https://cdn4.vectorstock.com/i/thumb-large/82/48/vinyl-record-blank-realistic-vinyl-disc-mockup-on-vector-17128248.jpg',
      spotify varchar(255),
      total_tracks INT
    );
    CREATE TABLE genres (
      id SERIAL PRIMARY KEY,
      genre varchar(255)
    );
    CREATE TABLE genre_albums (
      id SERIAL PRIMARY KEY,
      "albumId" INTEGER REFERENCES albums(id) ON DELETE CASCADE NOT NULL,
      "genreId" INTEGER REFERENCES genres(id) ON DELETE CASCADE NOT NULL
    );
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      email varchar(255) NOT NULL
    );
    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      review TEXT,
      rating BOOLEAN DEFAULT true,
      date DATE DEFAULT CURRENT_DATE,
      "albumId" INTEGER REFERENCES albums(id) ON DELETE CASCADE NOT NULL,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
    );
    CREATE TABLE cart (
      id SERIAL PRIMARY KEY, 
      quantity INT DEFAULT 0,
      "albumId" INTEGER REFERENCES albums(id) ON DELETE CASCADE NOT NULL,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
    )
  `);

    console.log('Tables Built!');
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log('Starting to create users...')
    await Promise.all(
      users.map(async (user) => {
        const {
          username,
          password,
          email
        } = user

        await createUser({
          username, 
          password, 
          email
        })
      })
    )
    
    console.log('Finished creating users!')
  } catch(error) {
    throw error
  }
}

async function createInitialAlbums() {
  try {
    console.log('Starting to create albums...');
    await Promise.all(
      albums.map(async (album) => {
        const {
          name,
          artists,
          release_date,
          genres,
          images,
          price,
          quantity,
          reorder,
          total_tracks,
          spotify,
        } = album;

        await createAlbums({
          name,
          artists,
          release_date,
          price,
          quantity,
          reorder,
          images,
          total_tracks,
          spotify,
        });
      })
    );

    console.log('Finished creating albums');
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    //await dropTables()
    await buildTables();
    await createInitialAlbums();
    await createInitialUsers()
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
