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
    const { text, sentiment, sentimentScore, userId } = req.body;

    if (!text || sentiment === undefined || sentimentScore === undefined || !userId) {
      return res.status(400).json({ error: "Text, sentimentScore, and userId are required fields." });
    }

    console.log("Received Data:", req.body);  

    const savedEntry = await saveJournalEntry(text, sentiment, sentimentScore, userId);

    res.status(201).json(savedEntry);
  } catch (err) {
    console.error("Error saving journal entry:", err);
    next(err); 
  }
};

  
  
