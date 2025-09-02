// File: src/routes/academicRoutes.js
const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { createCourse, studentDashboard, generateTranscript } = require('../controllers/academicController');

const router = express.Router();

router.post('/courses', authenticate, authorize(['admin']), createCourse);
router.get('/dashboard/student', authenticate, authorize(['student']), studentDashboard);
router.get('/transcript/:studentId', authenticate, authorize(['student', 'admin', 'instructor']), generateTranscript);

module.exports = router;