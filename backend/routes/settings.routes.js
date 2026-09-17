const express = require('express');
const {
  getSettings,
  updateSettings,
} = require('../controllers/settings.controller');

const router = express.Router();

router.route('/')
  .get(getSettings)
  .put(updateSettings);

module.exports = router;
