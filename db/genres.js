const client = require('./client');

// database methods

async function createGenre(genre) {
  try {
    const {
      rows: [genreName],
    } = await client.query(
      `
        INSERT INTO genres(genre)
        VALUES($1)
        ON CONFLICT DO NOTHING
        RETURNING *;
      `,
      [genre]
    );

    return genreName;
  } catch (error) {
    throw error;
  }
}

async function getAllGenres() {
  try {
    const { rows } = await client.query(
      ` 
      SELECT * FROM genres;
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getGenreByName(genreName) {
  try {
    const {
      rows: [genre],
    } = await client.query(
      ` 
      SELECT * FROM genres
      WHERE genre = $1;
    `,
      [genreName]
    );

    return genre;
  } catch (error) {
    throw error;
  }
}

async function getGenreById(id) {
  try {
    const {
      rows: [genre],
    } = await client.query(
      ` 
      SELECT * FROM genres
      WHERE id = $1;
    `,
      [id]
    );

    return genre;
  } catch (error) {
    throw error;
  }
}

module.exports = { createGenre, getAllGenres, getGenreByName, getGenreById };
