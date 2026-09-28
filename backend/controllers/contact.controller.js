const Contact = require('../models/Contact.model');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Submit Contact Inquiry Form
 * @route   POST /api/v1/contacts
 * @access  Public
 */
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, service, category, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
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
 * @access  Protected (Admin)
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
 * @access  Protected (Admin)
 */
exports.getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
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
 * @access  Protected (Admin)
 */
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return ApiResponse.error(res, 'Contact submission not found', 404);
    }

    return ApiResponse.success(res, contact, 'Contact status updated');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Contact Inquiry
 * @route   DELETE /api/v1/contacts/:id
 * @access  Protected (Admin)
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return ApiResponse.error(res, 'Contact submission not found', 404);
    }
    return ApiResponse.success(res, null, 'Contact submission deleted');
  } catch (error) {
    next(error);
  }
};
