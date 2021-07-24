const client = require('./client.js');
const { createGenre, getGenreByName } = require('./genres.js');
const { createAlbumGenres } = require('./album_genres.js');

// database methods

async function getAlbums() {
  try {
    const { rows } = await client.query(
      `
    SELECT * FROM albums;
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAlbumByID(id) {
  try {
    const {
      rows: [album],
    } = await client.query(
      `
    SELECT * FROM albums
    WHERE id = $1;
    `,
      id
    );

    return album;
  } catch (error) {
    throw error;
  }
}

async function createAlbums({
  name,
  artists,
  release_date,
  genres,
  price,
  quantity,
  reorder,
  images,
  total_tracks,
  spotify,
}) {
  try {
    const {
      rows: [album],
    } = await client.query(
      `
        INSERT INTO albums(album_name, artist, year, genres, price, quantity, reorder_number, img_url, total_tracks, spotify)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
      `,
      [
        name,
        artists,
        release_date,
        genres,
        price,
        quantity,
        reorder,
        images,
        total_tracks,
        spotify,
      ]
    );

    return album;
  } catch (error) {
    throw error;
  }
}

async function editAlbum() {
  // Will allow editing of albums
}

async function deleteAlbum() {
  // Will delete album
}

module.exports = {
  getAlbums,
  getAlbumByID,
  createAlbums,
  editAlbum,
  deleteAlbum,
};
