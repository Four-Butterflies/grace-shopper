const client = require('./client');

const createOrder = async ({ userId, status, total }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders( "userId", status, total)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [userId, status, total]
    );
    return order;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const { rows } = await client.query(
      `SELECT id, "userId", status, total, date FROM orders;`
    );
    const orderWithDetails = addDetailsToOrders(rows);
    return orderWithDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getOrdersWithDetailsByUserId = async (userId) => {
  try {
    const { rows } = await client.query(
      `
            SELECT * FROM orders WHERE "userId"=$1;
        `,
      [userId]
    );
    const orderWithDetails = addDetailsToOrders(rows);
    return orderWithDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getOrderWithDetailsByOrderId = async (orderId) => {
  try {
    const order = await getOrderById(orderId);
    const orderWithDetails = addDetailsToOrders(order);

    return orderWithDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getOrderById = async (orderId) => {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM orders WHERE id = $1;
    `,
      [orderId]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDetailsForOrder = async (orderId) => {
  try {
    const { rows } = await client.query(
      `
      SELECT  au.id as "albumUnitId", au."albumId", au.strike_price
      FROM orders o
      JOIN album_units au ON o.id = au."orderId"
      WHERE o.id = $1; 
    `,
      [orderId]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addDetailsToOrders = async (orders) => {
  try {
    console.log(orders);
    const result = Promise.all(
      orders.map(async (order) => {
        const details = await getDetailsForOrder(order.id);
        return {
          ...order,
          details,
        };
      })
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersWithDetailsByUserId,
  getOrderWithDetailsByOrderId,
};
