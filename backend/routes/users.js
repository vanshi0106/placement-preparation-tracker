const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/me', auth, getProfile);

module.exports = router;
