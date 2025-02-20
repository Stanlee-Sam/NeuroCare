const { getJournalEntries, saveJournalEntry, getAllJournalEntries, getRecentJournalEntries } = require('../services/journal.service');

exports.getJournalEntries = async (req, res, next) => {
  try {
    const entries = await getJournalEntries();
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

exports.getJournalEntriesForChart = async (req, res, next) => {
  try {
    const entries = await getAllJournalEntries(); 
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

exports.getRecentJournalEntriesForHistory = async (req, res, next) => {
  try {
    const entries = await getRecentJournalEntries(); 
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

exports.saveJournalEntry = async (req, res, next) => {  
  try {
    console.log("Request Body:", req.body);
    const { text, sentiment, sentimentScore, level, userId } = req.body;

    if (!text || sentiment === undefined || sentimentScore === undefined || !userId || level === undefined) {
      return res.status(400).json({ error: "Text, sentimentScore, and userId are required fields." });
    }

    console.log("Received Data:", req.body);  

    const savedEntry = await saveJournalEntry(text, sentiment, sentimentScore,level, userId);

    res.status(201).json(savedEntry);
  } catch (err) {
    console.error("Error saving journal entry:", err);
    next(err); 
  }
};

  
  
