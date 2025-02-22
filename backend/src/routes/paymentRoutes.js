const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/charge', paymentController.createCharge);

module.exports = router;
