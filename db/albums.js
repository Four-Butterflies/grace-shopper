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

module.exports = { createAlbums };
