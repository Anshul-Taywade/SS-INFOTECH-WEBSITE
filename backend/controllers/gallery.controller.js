const Gallery = require('../models/Gallery.model');
const mongoose = require('mongoose');

const findGalleryItemById = async (targetId) => {
  if (!targetId) return null;
  if (mongoose.Types.ObjectId.isValid(targetId)) {
    const item = await Gallery.findById(targetId);
    if (item) return item;
  }
  return await Gallery.findOne({ id: targetId });
};

// @desc    Get all gallery items
// @route   GET /api/v1/gallery
// @access  Public
exports.getGallery = async (req, res, next) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new gallery item
// @route   POST /api/v1/gallery
// @access  Private/Admin
exports.createGalleryItem = async (req, res, next) => {
  try {
    const itemData = {
      ...req.body,
      id: req.body.id || `real-${Date.now()}`
    };
    const item = await Gallery.create(itemData);
    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery item
// @route   PUT /api/v1/gallery/:id
// @access  Private/Admin
exports.updateGalleryItem = async (req, res, next) => {
  try {
    let item = await findGalleryItemById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Gallery item not found with id of ${req.params.id}`,
      });
    }

    item = await Gallery.findByIdAndUpdate(item._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/v1/gallery/:id
// @access  Private/Admin
exports.deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await findGalleryItemById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Gallery item not found with id of ${req.params.id}`,
      });
    }

    await Gallery.deleteOne({ _id: item._id });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
