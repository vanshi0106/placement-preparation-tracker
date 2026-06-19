const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { getAll, create } = require('../controllers/placementDriveController');

const router = express.Router();

router.get('/', getAll);
router.post(
  '/',
  auth,
  [body('company_id').isMongoId(), body('job_title').isString().notEmpty()],
  validate,
  create
);

module.exports = router;
