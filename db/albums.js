const client = require('./client');

// database methods

async function createAlbums({
  name,
  artists,
  release_date,
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
        INSERT INTO albums(album_name, artist, year, price, quantity, reorder_number, img_url, total_tracks, spotify)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `,
      [
        name,
        artists,
        release_date,
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

async function getAlbumsByName(name) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM albums
      WHERE album_name ILIKE $1;
    `, [`%${name}%`])
    console.log('did the query!')
    return rows
  } catch(error) {
    console.log('had an error')
    throw error
  }
}

async function getAlbumsByArtist(artist) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM albums
      WHERE artist ILIKE $1;
    `, [`%${artist}%`])
    console.log('did the query')
    return rows
  } catch(error) {
    console.log('had an error')
    throw error
  }
}

// async function getAlbumsByGenre(genre) {
  
// }

module.exports = { createAlbums, getAlbumsByName, getAlbumsByArtist };
