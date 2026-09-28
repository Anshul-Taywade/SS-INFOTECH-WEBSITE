const JobApplication = require('../models/JobApplication.model');
const ApiResponse = require('../utils/apiResponse');

exports.createApplication = async (req, res, next) => {
  try {
    const { candidateName, name, candidateEmail, email, jobTitle, service, portfolioLink, coverNote, message } = req.body;

    const application = await JobApplication.create({
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
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!application) return ApiResponse.error(res, 'Application not found', 404);
    return ApiResponse.success(res, application, 'Application status updated.');
  } catch (error) {
    next(error);
  }
};

exports.deleteApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    if (!application) return ApiResponse.error(res, 'Application not found', 404);
    return ApiResponse.success(res, null, 'Application deleted.');
  } catch (error) {
    next(error);
  }
};
