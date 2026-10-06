const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

router.get('/health', controller.healthCheck);
router.post('/api/transfers', controller.createTransfer);
router.get('/api/transfers', controller.listTransfers);

module.exports = router;
