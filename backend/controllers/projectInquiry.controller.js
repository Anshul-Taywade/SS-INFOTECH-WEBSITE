const ProjectInquiry = require('../models/ProjectInquiry.model');
const ApiResponse = require('../utils/apiResponse');

exports.createInquiry = async (req, res, next) => {
  try {
    const { clientName, name, clientEmail, email, serviceRequested, service, projectDetails, message } = req.body;

    const inquiry = await ProjectInquiry.create({
      clientName: clientName || name,
      clientEmail: clientEmail || email,
      serviceRequested: serviceRequested || service || 'Website Development',
      projectDetails: projectDetails || message || 'Project Consultation Request',
    });

    return ApiResponse.created(res, inquiry, 'Project inquiry submitted successfully.');
  } catch (error) {
    next(error);
  }
};

exports.getInquiries = async (req, res, next) => {
  try {
    const inquiries = await ProjectInquiry.find().sort({ createdAt: -1 });
    return ApiResponse.success(res, inquiries, 'Project inquiries retrieved.');
  } catch (error) {
    next(error);
  }
};

exports.updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await ProjectInquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!inquiry) return ApiResponse.error(res, 'Inquiry not found', 404);
    return ApiResponse.success(res, inquiry, 'Inquiry status updated.');
  } catch (error) {
    next(error);
  }
};

exports.deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await ProjectInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return ApiResponse.error(res, 'Inquiry not found', 404);
    return ApiResponse.success(res, null, 'Inquiry deleted.');
  } catch (error) {
    next(error);
  }
};
