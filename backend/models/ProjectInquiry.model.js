const mongoose = require('mongoose');

const projectInquirySchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    clientEmail: {
      type: String,
      required: [true, 'Client email is required'],
      trim: true,
      lowercase: true,
    },
    serviceRequested: {
      type: String,
      default: 'Website Development',
    },
    projectDetails: {
      type: String,
      required: [true, 'Project details are required'],
      trim: true,
    },
    id: {
      type: String,
    },
    status: {
      type: String,
      default: 'NEW',
    },
  },
  {
    timestamps: true,
    collection: 'project_inquiries',
  }
);

module.exports = mongoose.model('ProjectInquiry', projectInquirySchema);
