const Service = require('../models/Service.model');
const ApiResponse = require('../utils/apiResponse');
const mongoose = require('mongoose');

const findServiceById = async (targetId) => {
  if (!targetId) return null;
  if (mongoose.Types.ObjectId.isValid(targetId)) {
    const service = await Service.findById(targetId);
    if (service) return service;
  }
  return await Service.findOne({ id: targetId });
};

/**
 * @desc    Get All Active Services
 * @route   GET /api/v1/services
 * @access  Public
 */
exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return ApiResponse.success(res, services, 'Services retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create New Service
 * @route   POST /api/v1/services
 * @access  Protected (Admin)
 */
exports.createService = async (req, res, next) => {
  try {
    const serviceData = {
      ...req.body,
      id: req.body.id || `srv-${Date.now()}`
    };
    const service = await Service.create(serviceData);
    return ApiResponse.created(res, service, 'Service created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Service
 * @route   PUT /api/v1/services/:id
 * @access  Protected (Admin)
 */
exports.updateService = async (req, res, next) => {
  try {
    const existing = await findServiceById(req.params.id);
    if (!existing) {
      return ApiResponse.error(res, 'Service not found', 404);
    }

    const service = await Service.findByIdAndUpdate(existing._id, req.body, {
      new: true,
      runValidators: true,
    });
    
    return ApiResponse.success(res, service, 'Service updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Service
 * @route   DELETE /api/v1/services/:id
 * @access  Protected (Admin)
 */
exports.deleteService = async (req, res, next) => {
  try {
    const existing = await findServiceById(req.params.id);
    if (!existing) {
      return ApiResponse.error(res, 'Service not found', 404);
    }
    await Service.deleteOne({ _id: existing._id });
    return ApiResponse.success(res, null, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
};
