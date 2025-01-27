const express = require('express');
const router = express.Router();
const sentimentController = require('../controllers/sentiment.controller.js');
const sentimentMiddleware = require('../middleware/sentiment.middleware.js');

router.post('/analyze-sentiment', sentimentMiddleware.validateSentimentInput, sentimentController.analyzeSentiment);

module.exports = router;
