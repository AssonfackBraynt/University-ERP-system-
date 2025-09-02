// File: src/routes/authRoutes.js
const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { register, login, updateUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', authenticate, authorize(['admin']), register);
router.post('/login', login);
router.patch('/user', authenticate, updateUser);

module.exports = router;