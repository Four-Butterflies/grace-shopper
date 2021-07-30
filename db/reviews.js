const client = require('./client.js');

async function createReview({ review, rating, albumId, userId }) {
  try {
    const {
      rows: [row],
    } = await client.query(
      `
        INSERT INTO reviews(review, rating, "albumId", "userId")
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `,
      [review, rating, albumId, userId]
    );

    return row;
  } catch (error) {
    throw error;
  }
}

module.exports = { createReview };
