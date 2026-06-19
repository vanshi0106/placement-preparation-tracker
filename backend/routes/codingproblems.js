const express = require('express');
const { body, param, query } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/codingProblemController');

const router = express.Router();

router.get(
  '/',
  [query('difficulty').optional().isIn(['Easy', 'Medium', 'Hard']), query('tag').optional().isString()],
  validate,
  ctrl.list
);
router.get('/:id', [param('id').isMongoId()], validate, ctrl.getById);
router.post('/', auth, [body('title').isString().notEmpty()], validate, ctrl.create);

module.exports = router;
