const express = require('express');
const {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/gallery.controller');

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(createGalleryItem);

router.route('/:id')
  .put(updateGalleryItem)
  .delete(deleteGalleryItem);

module.exports = router;
