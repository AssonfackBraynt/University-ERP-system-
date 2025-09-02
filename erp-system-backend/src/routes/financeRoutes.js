// File: src/routes/financeRoutes.js
const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { createInvoice, monthlyReport } = require('../controllers/financeController');

const router = express.Router();

router.post('/invoices', authenticate, authorize(['accountant', 'admin']), createInvoice);
router.get('/monthly-report', authenticate, authorize(['accountant', 'admin']), monthlyReport);

module.exports = router;