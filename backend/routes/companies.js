const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { getAll, create } = require('../controllers/companyController');

const router = express.Router();

router.get('/', getAll);
router.post('/', auth, [body('name').isString().notEmpty()], validate, create);

module.exports = router;
