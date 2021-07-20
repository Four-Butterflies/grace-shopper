const client = require('./client');

// database methods

async function createGenres({ genre }) {
  try {
    const {
      rows: [genreName],
    } = await client.query(
      `
        INSERT INTO genres(genre)
        VALUES($1)
        ON CONFLICT (genre) DO NOTHING
        RETURNING *;
      `,
      [genre]
    );

    return genreName;
  } catch (error) {
    throw error;
  }
}

module.exports = { createGenres };
