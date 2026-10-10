const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    isSeeded: {
      type: Boolean,
      default: false,
    },
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
    customId: {
      type: String,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Gallery', gallerySchema);
