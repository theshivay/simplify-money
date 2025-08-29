const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// POST /api/purchase - Handle gold purchase
router.post('/', purchaseController.handlePurchase);

// GET /api/purchase/:userId - Get purchase history for a user
router.get('/:userId', purchaseController.getPurchaseHistory);

module.exports = router;
