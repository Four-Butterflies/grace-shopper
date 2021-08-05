const client = require('./client.js');

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
    const orderWithDetails = await addDetailsToOrders(order);
    
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
        SELECT  au.id as "albumUnitId", au."albumId", au.strike_price, a.album_name
        FROM orders o
        JOIN album_units au ON o.id = au."orderId"
        JOIN albums a ON au."albumId" = a.id
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
    const result = Promise.all(
      orders.map(async (order) => {
        const details = await getDetailsForOrder(order.id);
         details.forEach((detail)=>{ order.total = order.total + detail.strike_price})
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
