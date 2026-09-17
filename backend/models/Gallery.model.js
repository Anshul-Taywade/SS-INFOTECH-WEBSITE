const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    category: {
      type: String,
      default: 'Office Environment',
    },
    location: {
      type: String,
      default: 'SS Infotech Headquarters',
    },
    date: {
      type: String,
      default: '2026',
    },
    caption: {
      type: String,
      default: '',
    },
    imgSrc: {
      type: String,
      required: [true, 'Image source URL is required'],
    },
    aspect: {
      type: String,
      default: 'aspect-video',
    },
    isReal: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Gallery', gallerySchema);
