const JobApplication = require('../models/JobApplication.model');
const ApiResponse = require('../utils/apiResponse');
const mongoose = require('mongoose');

const findApplicationById = async (targetId) => {
  if (!targetId) return null;
  if (mongoose.Types.ObjectId.isValid(targetId)) {
    const item = await JobApplication.findById(targetId);
    if (item) return item;
  }
  return await JobApplication.findOne({ id: targetId });
};

exports.createApplication = async (req, res, next) => {
  try {
    const { candidateName, name, candidateEmail, email, jobTitle, service, portfolioLink, coverNote, message } = req.body;

    const application = await JobApplication.create({
      id: req.body.id || `MSG-${Date.now()}`,
      candidateName: candidateName || name,
      candidateEmail: candidateEmail || email,
      jobTitle: jobTitle || (service ? service.replace('Job Application: ', '') : 'Engineering Role'),
      portfolioLink: portfolioLink || 'N/A',
      coverNote: coverNote || message || '',
    });

    return ApiResponse.created(res, application, 'Job application submitted successfully.');
  } catch (error) {
    next(error);
  }
};

exports.getApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    return ApiResponse.success(res, applications, 'Job applications retrieved.');
  } catch (error) {
    next(error);
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const existing = await findApplicationById(req.params.id);
    if (!existing) return ApiResponse.error(res, 'Application not found', 404);

    const application = await JobApplication.findByIdAndUpdate(
      existing._id,
      { status },
      { new: true, runValidators: false }
    );
    return ApiResponse.success(res, application, 'Application status updated.');
  } catch (error) {
    next(error);
  }
};

exports.deleteApplication = async (req, res, next) => {
  try {
    const existing = await findApplicationById(req.params.id);
    if (!existing) return ApiResponse.error(res, 'Application not found', 404);

    await JobApplication.deleteOne({ _id: existing._id });
    return ApiResponse.success(res, null, 'Application deleted.');
  } catch (error) {
    next(error);
  }
};
