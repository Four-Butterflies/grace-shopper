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

module.exports = { createAlbumGenres };
