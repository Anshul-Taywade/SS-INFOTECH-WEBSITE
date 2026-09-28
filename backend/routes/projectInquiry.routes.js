const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectInquiry.controller');

router.route('/')
  .post(controller.createInquiry)
  .get(controller.getInquiries);

router.route('/:id/status')
  .patch(controller.updateInquiryStatus);

router.route('/:id')
  .delete(controller.deleteInquiry);

module.exports = router;
