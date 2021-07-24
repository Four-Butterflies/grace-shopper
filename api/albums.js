const express = require('express');
const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    try{

    } catch(error) {
        next(error)
    }
})

module.exports = albumsRouter;
