// Connect to DB
const { Client } = require('pg');
// I chose vinyldb as our DB name
const DB_NAME = 'vinyldb'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
async function createAlbums({
  album_name,
  artist,
  year,
  price,
  quantity,
  reorder,
  img_url
}) {
  try {
    const { rows: [ album ] } = await client.query(`
      INSERT INTO albums(album_name, artist, year, price, quantity, reorder_number, img_url)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `, [album_name, artist, year, price, quantity, reorder, img_url]);

    return album;
  } catch (error) {
    throw error;
  }
}

async function createGenres({
  genre,
}) {
  try {
    const { rows: [ genreName ] } = await client.query(`
      INSERT INTO genres(genre)
      VALUES($1)
      ON CONFLICT (genre) DO NOTHING
      RETURNING *;
    `, [genre]);

    return genreName;
  } catch (error) {
    throw error;
  }
}

async function createAlbumGenres(albumId, genreId) {
  try {
    await client.query(`
      INSERT INTO genre_albums("albumId", "genreId")
      VALUES ($1, $2)
      `, [albumId, genreId]);
  } catch (error) {
    throw error;
  }
}

async function createUser({
  username,
  password,
  email
}) {
  try {
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password, email)
      VALUES($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username, email;
    `, [username, password, email]);

    return user;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  // db methods
  createAlbums,
  createGenres,
  createAlbumGenres,
  createUser
}