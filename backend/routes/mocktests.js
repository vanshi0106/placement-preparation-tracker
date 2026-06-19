const express = require('express');
const { body, param } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/mockTestController');

const router = express.Router();

router.get('/', ctrl.list);
router.get('/:id', [param('id').isMongoId()], validate, ctrl.getById);
router.post(
  '/',
  auth,
  [body('title').isString().notEmpty(), body('duration').optional().isNumeric()],
  validate,
  ctrl.create
);

module.exports = router;
