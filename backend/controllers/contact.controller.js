const Contact = require('../models/Contact.model');
const ApiResponse = require('../utils/apiResponse');
const mongoose = require('mongoose');

const findContactById = async (targetId) => {
  if (!targetId) return null;
  if (mongoose.Types.ObjectId.isValid(targetId)) {
    const item = await Contact.findById(targetId);
    if (item) return item;
  }
  return await Contact.findOne({ id: targetId });
};

/**
 * @desc    Submit Contact Inquiry Form
 * @route   POST /api/v1/contacts
 * @access  Public
 */
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, service, category, message, phone, subject } = req.body;

    const contact = await Contact.create({
      id: req.body.id || `MSG-${Date.now()}`,
      name,
      email,
      phone: phone || '+91 98765 43210',
      subject: subject || service || 'Website Lead Inquiry',
      service: service || 'Website Development',
      category: category || (service && service.toLowerCase().includes('job') ? 'JOB_APPLICATION' : 'SERVICE_INQUIRY'),
      message,
    });

    return ApiResponse.created(
      res,
      contact,
      'Thank you! Your message has been received successfully.'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get All Contact Submissions (Leads)
 * @route   GET /api/v1/contacts
 * @access  Public / Admin
 */
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return ApiResponse.success(res, contacts, 'Contact submissions retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Single Contact Inquiry
 * @route   GET /api/v1/contacts/:id
 * @access  Public / Admin
 */
exports.getContactById = async (req, res, next) => {
  try {
    const contact = await findContactById(req.params.id);
    if (!contact) {
      return ApiResponse.error(res, 'Contact submission not found', 404);
    }
    return ApiResponse.success(res, contact, 'Contact details retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Contact Inquiry Status
 * @route   PATCH /api/v1/contacts/:id/status
 * @access  Public / Admin
 */
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const existing = await findContactById(req.params.id);

    if (!existing) {
      return ApiResponse.error(res, 'Contact submission not found', 404);
    }

    const contact = await Contact.findByIdAndUpdate(
      existing._id,
      { status },
      { new: true, runValidators: false }
    );

    return ApiResponse.success(res, contact, 'Contact status updated');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Contact Inquiry
 * @route   DELETE /api/v1/contacts/:id
 * @access  Public / Admin
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const existing = await findContactById(req.params.id);
    if (!existing) {
      return ApiResponse.error(res, 'Contact submission not found', 404);
    }
    await Contact.deleteOne({ _id: existing._id });
    return ApiResponse.success(res, null, 'Contact submission deleted');
  } catch (error) {
    next(error);
  }
};
