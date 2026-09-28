const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'SS INFOTECH',
    },
    certification: {
      type: String,
      default: 'ISO 9001:2015 Certified Firm',
    },
    email: {
      type: String,
      default: 'info@ssinfotech.org',
    },
    phone: {
      type: String,
      default: '+91 77700 23791',
    },
    address: {
      type: String,
      default: '#40, 2nd Floor, 2nd Cross, 2nd Main, Outer Ring Road, Bangalore.',
    },
    location: {
      type: String,
      default: 'Software R&D Hub & Training Center',
    },
    galleryRealMode: {
      type: Boolean,
      default: true,
    },
    autoSyncMedia: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Settings', settingsSchema);
