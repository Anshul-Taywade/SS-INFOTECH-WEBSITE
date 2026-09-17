const Team = require('../models/Team.model');

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
    const member = await Team.create(req.body);
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
    let member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: `Team member not found with id of ${req.params.id}`,
      });
    }

    member = await Team.findByIdAndUpdate(req.params.id, req.body, {
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
    const member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: `Team member not found with id of ${req.params.id}`,
      });
    }

    await member.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
