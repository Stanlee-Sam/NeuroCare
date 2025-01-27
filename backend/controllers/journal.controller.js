const { getJournalEntries, saveJournalEntry } = require('../services/journal.service');

exports.getJournalEntries = async (req, res, next) => {
  try {
    const entries = await getJournalEntries();
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

exports.saveJournalEntry = async (req, res, next) => {
    try {
      const { entry, sentimentScore, userId } = req.body; 
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" }); 
      }
      const savedEntry = await saveJournalEntry(entry, sentimentScore, userId);
      res.status(201).json(savedEntry);
    } catch (err) {
      next(err);
    }
  };
  
  
