// const client = require('./client');

// If something isnt being used, delete it.

// // database methods

// async function createOrder({
//   albumId,
//   userId,
//   strikePrice
// }) {
//   try {
//     const {
//       rows: [order],
//     } = await client.query(
//       `
//         INSERT INTO orders("albumId", "userId", strike_price)
//         VALUES($1, $2, $3)
//         RETURNING *;
//       `,
//       [
//         albumId,
//         userId,
//         strikePrice
//       ]
//     );

//     return order;
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = { createOrder };
