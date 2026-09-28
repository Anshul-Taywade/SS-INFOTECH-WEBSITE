const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['gallery', 'inquiry', 'service', 'team', 'settings', 'system'],
      default: 'system',
    },
    link: {
      type: String,
      default: '/',
    },
    adminName: {
      type: String,
      default: 'Admin User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ActivityLog', activityLogSchema);
