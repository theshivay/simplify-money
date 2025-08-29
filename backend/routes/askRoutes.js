const express = require('express');
const router = express.Router();
const askController = require('../controllers/askController');

// POST /api/ask - Handle AI queries about gold investments
router.post('/', askController.handleAskQuery);

module.exports = router;
