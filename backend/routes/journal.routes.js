const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journal.controller.js');

router.get('/journal', journalController.getJournalEntries);

router.post('/journal', journalController.saveJournalEntry);

module.exports = router;
