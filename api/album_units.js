const express = require('express');
const albumUnitsRouter = express.Router();
const {
  createAlbumUnit,
  deleteAlbumUnit
} = require('../db/album_units.js');

albumUnitsRouter.post('/', async (req, res, next) => {
    const { albumId, userId, strikePrice } = req.body;

    try {
        const newAlbumUnit = await createAlbumUnit(albumId, userId, strikePrice)
        res.send(newAlbumUnit)
    } catch (error) {
        next(error);
    }
});

albumUnitsRouter.delete('/', async (req, res, next) => {
    const { albumUnitId } = req.body;

    try {   
        const deletedAlbumUnit = await deleteAlbumUnit(albumUnitId)
        res.send(deletedAlbumUnit)
    } catch(error) {
        next(error)
    }
})

module.exports = albumUnitsRouter