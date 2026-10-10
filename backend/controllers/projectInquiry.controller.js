const ProjectInquiry = require('../models/ProjectInquiry.model');
const ApiResponse = require('../utils/apiResponse');
const mongoose = require('mongoose');

const findInquiryById = async (targetId) => {
  if (!targetId) return null;
  if (mongoose.Types.ObjectId.isValid(targetId)) {
    const item = await ProjectInquiry.findById(targetId);
    if (item) return item;
  }
  return await ProjectInquiry.findOne({ id: targetId });
};

exports.createInquiry = async (req, res, next) => {
  try {
    const { clientName, name, clientEmail, email, serviceRequested, service, projectDetails, message } = req.body;

    const inquiry = await ProjectInquiry.create({
      id: req.body.id || `MSG-${Date.now()}`,
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
    const existing = await findInquiryById(req.params.id);
    if (!existing) return ApiResponse.error(res, 'Inquiry not found', 404);

    const inquiry = await ProjectInquiry.findByIdAndUpdate(
      existing._id,
      { status },
      { new: true, runValidators: false }
    );
    return ApiResponse.success(res, inquiry, 'Inquiry status updated.');
  } catch (error) {
    next(error);
  }
};

exports.deleteInquiry = async (req, res, next) => {
  try {
    const existing = await findInquiryById(req.params.id);
    if (!existing) return ApiResponse.error(res, 'Inquiry not found', 404);

    await ProjectInquiry.deleteOne({ _id: existing._id });
    return ApiResponse.success(res, null, 'Inquiry deleted.');
  } catch (error) {
    next(error);
  }
};
