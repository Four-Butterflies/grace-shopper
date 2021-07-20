const client = require('./client');

// database methods

async function createAlbumGenres(albumId, genreId) {
  try {
    await client.query(
      `
        INSERT INTO genre_albums("albumId", "genreId")
        VALUES ($1, $2)
        `,
      [albumId, genreId]
    );
  } catch (error) {
    throw error;
  }
}

async function getAlbumsByGenreId(genreId) {
  try {
    const { rows } = await client.query(
      ` 
      SELECT * FROM genre_albums
      WHERE "genreId" = $1
    `,
      [genreId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getGenresByAlbumId(albumId) {
  try {
    const { rows } = await client.query(
      ` 
      SELECT * FROM genre_albums
      WHERE "albumId" = $1
    `,
      [albumId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { createAlbumGenres, getAlbumsByGenreId, getGenresByAlbumId };
