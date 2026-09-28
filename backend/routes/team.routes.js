const express = require('express');
const {
  getTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/team.controller');

const router = express.Router();

router.route('/')
  .get(getTeam)
  .post(createTeamMember);

router.route('/:id')
  .put(updateTeamMember)
  .delete(deleteTeamMember);

module.exports = router;
