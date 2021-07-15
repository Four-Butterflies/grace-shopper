// code to build and initialize DB goes here
const {
  client,
  // other db methods 
  createAlbums,
  createGenres,
  createAlbumGenres,
  createUser
} = require('./index');

async function buildTables() {
  try {
    console.log("Building tables...");
    await client.connect();

    // build tables in correct order

    await client.query(`
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
      img_url varchar(255) DEFAULT 'https://cdn4.vectorstock.com/i/thumb-large/82/48/vinyl-record-blank-realistic-vinyl-disc-mockup-on-vector-17128248.jpg'
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
    )
  `);

    console.log("Tables Built!")
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("Starting to create albums...");
    await createAlbums({
      album_name: 'The Colour and the Shape',
      artist: 'Foo Fighters',
      year: 1997,
      price: 1999,
      quantity: 12,
      reorder: 1,
      img_url: 'https://upload.wikimedia.org/wikipedia/en/0/0d/FooFighters-TheColourAndTheShape.jpg'
    });

    console.log("finished creating albums")

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());