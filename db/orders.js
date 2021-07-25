const client = require('./client');

const createOrder = async ({userId, status, total}) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders( "userId", status, total)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [ userId, status, total]
    );
    return order;
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async () => {
  try {
    const { rows } = await client.query(
      `SELECT id, "userId", status, total, date FROM orders;`
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

const getOrderDetailsByOrderId = async(orderId) =>{
  try {
    const {rows} = await client.query(`
      SELECT o.id as "orderID", o."userId", o.status, o.total, o.date, au.id as "albumUnitId", au."albumId", au.strike_price
      FROM orders o
      JOIN album_units au ON o.id = au."orderId"
      WHERE o.id = $1; 
    `,[orderId]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error
  }
}

module.exports = { createOrder, getAllOrders, getOrdersByUserId, getOrderDetailsByOrderId };
