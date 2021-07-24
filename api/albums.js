const express = require('express');
const albumsRouter = express.Router();
const {
  getAlbums,
  getAlbumByID,
  getAlbumsByName,
  getAlbumsByArtist,
  createAlbums,
  editAlbum,
  deleteAlbum,
} = require('../db/albums.js');

// GET
albumsRouter.get('/', async (req, res, next) => {
  try {
    const result = await getAlbums();

    res.send(result);
  } catch (error) {
    next(error);
  }
});

albumsRouter.get('/:albumID', async (req, res, next) => {
  const { albumID } = req.params;

  try {
    const result = await getAlbumByID(albumID);

    res.send(result);
  } catch (error) {
    next(error);
  }
});

// albumsRouter.get('/:name', async (req, res, next) => {
//   const { name } = req.params;

//   try {
//     const albumNames = await getAlbumsByName(name);
//     res.send(albumNames);
//   } catch (error) {
//     next(error);
//   }
// });

// albumsRouter.get('/:artist', async (req, res, next) => {
//   const { artist } = req.params;

//   try {
//     const albumArtist = await getAlbumsByArtist(artist);
//     res.send(albumArtist);
//   } catch (error) {
//     next(error);
//   }
// });

// POST
albumsRouter.post('/', async (req, res, next) => {
  const {
    name,
    artists,
    release_date,
    genres,
    price,
    quantity,
    reorder,
    image,
    total_tracks,
    spotify,
  } = req.body;

  try {
    const result = await createAlbums({
      name,
      artists,
      release_date,
      genres,
      price,
      quantity,
      reorder,
      image,
      total_tracks,
      spotify,
    });

    res.send(result);
  } catch (error) {
    next(error);
  }
});

// PATCH
albumsRouter.patch('/:albumID', async (req, res, next) => {
  const { albumID } = req.params;
  const {
    name,
    artists,
    release_date,
    genres,
    price,
    quantity,
    reorder,
    image,
    total_tracks,
    spotify,
  } = req.body;

  try {
    const result = await editAlbum(albumID, {
      name,
      artists,
      release_date,
      genres,
      price,
      quantity,
      reorder,
      image,
      total_tracks,
      spotify,
    });

    res.send(result);
  } catch (error) {
    next(error);
  }
});

// DELETE
albumsRouter.delete('/:albumID', async (req, res, next) => {
  const { albumID } = req.params;

  try {
    const result = await deleteAlbum(albumID);

    res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = albumsRouter;
