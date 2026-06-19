const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/resumeController');

const router = express.Router();

router.get('/me', auth, ctrl.getMine);
router.put(
  '/me',
  auth,
  [body('sections').optional().isObject(), body('job_desc').optional().isString()],
  validate,
  ctrl.upsertMine
);

module.exports = router;
