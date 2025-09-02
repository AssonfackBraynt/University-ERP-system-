// File: src/routes/hrRoutes.js
const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { approveLeave, hrDashboard } = require('../controllers/hrController');

const router = express.Router();

router.put('/leave/:request_id/approve', authenticate, authorize(['hr_manager', 'admin']), approveLeave);
router.get('/dashboard', authenticate, authorize(['hr_manager', 'staff', 'admin']), hrDashboard);

module.exports = router;