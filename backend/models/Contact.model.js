const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    service: {
      type: String,
      required: [true, 'Service selection is required'],
      default: 'Website Development',
    },
    category: {
      type: String,
      enum: ['SERVICE_INQUIRY', 'JOB_APPLICATION'],
      default: 'SERVICE_INQUIRY',
    },
    id: {
      type: String,
    },
    message: {
      type: String,
      required: [true, 'Project message details are required'],
      trim: true,
    },
    status: {
      type: String,
      default: 'NEW',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
