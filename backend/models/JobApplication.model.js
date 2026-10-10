const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: [true, 'Candidate name is required'],
      trim: true,
    },
    candidateEmail: {
      type: String,
      required: [true, 'Candidate email is required'],
      trim: true,
      lowercase: true,
    },
    jobTitle: {
      type: String,
      default: 'Engineering Role',
    },
    portfolioLink: {
      type: String,
      default: 'N/A',
    },
    coverNote: {
      type: String,
      default: '',
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
    collection: 'job_applications',
  }
);

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
