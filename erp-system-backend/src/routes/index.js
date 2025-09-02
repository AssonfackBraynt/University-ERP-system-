const express = require('express');
const authRoutes = require('./authRoutes');
const academicRoutes = require('./academicRoutes');
const financeRoutes = require('./financeRoutes');
const hrRoutes = require('./hrRoutes');
const { backupDatabase } = require('../controllers/generalController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/academic', academicRoutes);
router.use('/finance', financeRoutes);
router.use('/hr', hrRoutes);
router.post('/backup', authenticate, authorize(['admin']), backupDatabase);

module.exports = router;