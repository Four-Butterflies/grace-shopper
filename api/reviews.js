const express = require('express');
const reviewsRouter = express.Router();
const { createReview } = require('../db/reviews.js');
const { getAlbumByID } = require('../db/albums.js');

reviewsRouter.post('/:albumId/newreview', async (req, res) => {
  const { albumId } = req.params;
  const { review, rating, userId } = req.body;
  try {
    const [album] = await getAlbumByID(albumId);
    if (!album.id) {
      res.status(500).send({
        name: 'Album Not Found',
        message: 'There is no album under that Id.',
      });
    }
    const newReview = await createReview({review, rating, albumId, userId})
    if(review){
        res.send(newReview)
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = reviewsRouter;
