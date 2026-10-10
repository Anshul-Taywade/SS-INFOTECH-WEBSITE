const Team = require('../models/Team.model');
const mongoose = require('mongoose');

const findTeamMemberById = async (targetId) => {
  if (!targetId) return null;
  if (mongoose.Types.ObjectId.isValid(targetId)) {
    const member = await Team.findById(targetId);
    if (member) return member;
  }
  return await Team.findOne({ id: targetId });
};

// @desc    Get all team members
// @route   GET /api/v1/team
// @access  Public
exports.getTeam = async (req, res, next) => {
  try {
    const team = await Team.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: team.length,
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new team member
// @route   POST /api/v1/team
// @access  Private/Admin
exports.createTeamMember = async (req, res, next) => {
  try {
    const memberData = {
      ...req.body,
      id: req.body.id || `team-${Date.now()}`
    };
    const member = await Team.create(memberData);
    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update team member
// @route   PUT /api/v1/team/:id
// @access  Private/Admin
exports.updateTeamMember = async (req, res, next) => {
  try {
    let member = await findTeamMemberById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: `Team member not found with id of ${req.params.id}`,
      });
    }

    member = await Team.findByIdAndUpdate(member._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete team member
// @route   DELETE /api/v1/team/:id
// @access  Private/Admin
exports.deleteTeamMember = async (req, res, next) => {
  try {
    const member = await findTeamMemberById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: `Team member not found with id of ${req.params.id}`,
      });
    }

    await Team.deleteOne({ _id: member._id });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
