const client = require('./client');

const createOrder = async (albumUnitsId, userId, status, total) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("albumUnitsId", "userId", status, total)
        RETURNING *;
        `,
      [albumUnitsId, userId, status, total]
    );
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async () => {
  try {
    const { rows } = await client.query(
      `SELECT id, "albumUnitsId", "userId", status, total, date FROM orders;`
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getOrdersByUserId = async (userId) => {
  try {
    const { rows } = await client.query(
      `
            SELECT * FROM orders WHERE "userId"=$1;
        `,
      [userId]
    );
    return rows;
  } catch (error) {}
};

module.exports = { createOrder, getAllOrders, getOrdersByUserId };
