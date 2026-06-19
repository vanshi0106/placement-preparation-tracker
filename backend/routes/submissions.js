const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/submissionController');

const router = express.Router();

router.post('/', auth, [body('answers').isArray(), body('test_id').optional().isMongoId()], validate, ctrl.create);
router.get('/me', auth, ctrl.mine);

module.exports = router;
