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

// These functions don't seem to work?
albumsRouter.get('/name/:name', async (req, res, next) => {
  const { name } = req.params;
  console.log(name)

  try {
    const albumNames = await getAlbumsByName(name);
    res.send(albumNames);
  } catch (error) {
    next(error);
  }
});

albumsRouter.get('/artist/:artist', async (req, res, next) => {
  const { artist } = req.params;

  try {
    const albumArtist = await getAlbumsByArtist(artist);
    res.send(albumArtist);
  } catch (error) {
    next(error);
  }
});

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
    name: album_name,
    artists: artist,
    release_date: year,
    genres,
    price,
    quantity,
    reorder: reorder_number,
    image: img_url,
    total_tracks,
    spotify,
  } = req.body;

  const albumObj = {
    album_name,
    artist,
    year,
    genres,
    price,
    quantity,
    reorder_number,
    img_url,
    total_tracks,
    spotify,
  };

  Object.keys(albumObj).forEach((key) => {
    if (albumObj[key] === undefined) {
      delete albumObj[key];
    }
  });

  try {
    const result = await editAlbum(albumID, albumObj);

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
