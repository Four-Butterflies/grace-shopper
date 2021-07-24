const express = require('express');
const { getAlbumsByName, getAlbumsByArtist } = require('../db/albums');
const albumsRouter = express.Router();

albumsRouter.get('/:name', async (req, res, next) => {
    const { name } = req.params;

    try{
        const albumNames = await getAlbumsByName(name)
        res.send(albumNames)
    } catch(error) {
        next(error)
    }
})

albumsRouter.get('/:artist', async (req, res, next ) => {
    const { artist } = req.params;

    try {
        const albumArtist = await getAlbumsByArtist(artist)
        res.send(albumArtist)
    } catch(error) {
        next(error)
    }
})

module.exports = albumsRouter;
