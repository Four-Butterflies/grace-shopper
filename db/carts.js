const client = require('./client');

// database methods

async function createCart({
  quantity,
  albumId,
  userId
}) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        INSERT INTO cart(quantity, "albumId", "userId")
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [
        quantity,
        albumId,
        userId
      ]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = { createCart };
