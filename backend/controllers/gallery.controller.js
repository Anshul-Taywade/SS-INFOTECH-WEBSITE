const Gallery = require('../models/Gallery.model');

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
    const item = await Gallery.create(req.body);
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
    let item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Gallery item not found with id of ${req.params.id}`,
      });
    }

    item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
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
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Gallery item not found with id of ${req.params.id}`,
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
