const ActivityLog = require('../models/ActivityLog.model');

// @desc    Get all activity logs
// @route   GET /api/v1/activity-logs
// @access  Public / Admin
exports.getActivityLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new activity log entry
// @route   POST /api/v1/activity-logs
// @access  Public / Admin
exports.createActivityLog = async (req, res, next) => {
  try {
    const log = await ActivityLog.create(req.body);
    res.status(201).json({
      success: true,
      data: log,
    });
  } catch (error) {
    next(error);
  }
};
