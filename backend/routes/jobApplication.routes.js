const express = require('express');
const router = express.Router();
const controller = require('../controllers/jobApplication.controller');

router.route('/')
  .post(controller.createApplication)
  .get(controller.getApplications);

router.route('/:id/status')
  .patch(controller.updateApplicationStatus);

router.route('/:id')
  .delete(controller.deleteApplication);

module.exports = router;
