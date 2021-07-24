// const express = require('express');
// const ordersRouter = express.Router();

// ordersRouter.post('/', async (req, res, next) => {
//     const { albumUnitId, userId, status } = req.body

//     try {
//         const newOrder = await createOrder(albumUnitId, userId, status)
//         res.send(newOrder)
//     } catch(error) {
//         next(error)
//     }
// })

// // delete a row from orders
// ordersRouter.delete('/', async (req, res, next) => {
//     const {orderId} = req.body;

//     try {
//         const deletedOrder = await deleteOrder(orderId)
//         res.send(deletedOrder)
//     } catch(error) {
//         next(error)
//     }
// })

// module.exports = ordersRouter