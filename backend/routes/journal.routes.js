const express = require('express');
const router = express.Router();
const journalEntryController = require('../controllers/journal.controller.js');
const journalEntryMiddleware = require('../middleware/journal.middleware.js');

router.post('/create', journalEntryMiddleware.validateJournalEntry, journalEntryController.saveJournalEntry);

router.get('/', journalEntryController.getJournalEntries);

module.exports = router;
