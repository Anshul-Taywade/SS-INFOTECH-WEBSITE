const express = require('express');
const {
  getActivityLogs,
  createActivityLog,
} = require('../controllers/activityLog.controller');

const router = express.Router();

router.route('/')
  .get(getActivityLogs)
  .post(createActivityLog);

module.exports = router;
