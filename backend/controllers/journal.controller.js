const {
  getJournalEntries,
  saveJournalEntry,
  getAllJournalEntries,
  getRecentJournalEntries,
  deleteJournalEntry,
} = require("../services/journal.service");

exports.getJournalEntries = async (req, res, next) => {
  try {
    console.log("User in request:", req.user);
    const firebaseUid = req.user?.firebaseUid;
    if (!firebaseUid)
      return res.status(403).json({ error: "Unauthorized: No user found." });

    const entries = await getJournalEntries(firebaseUid);
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

exports.getJournalEntriesForChart = async (req, res, next) => {
  try {
    console.log("User in request:", req.user);
    const firebaseUid = req.user?.firebaseUid;
    if (!firebaseUid)
      return res.status(403).json({ error: "Unauthorized: No user found." });

    const entries = await getAllJournalEntries(firebaseUid);
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

exports.getRecentJournalEntriesForHistory = async (req, res, next) => {
  try {
    console.log("User in request:", req.user);
    const firebaseUid = req.user?.firebaseUid;
    if (!firebaseUid)
      return res.status(403).json({ error: "Unauthorized: No user found." });

    const entries = await getRecentJournalEntries(firebaseUid);
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

exports.saveJournalEntry = async (req, res, next) => {
  try {
    console.log("User in request:", req.user);
    const { text, sentiment, sentimentScore, level } = req.body;
    const firebaseUid = req.user?.firebaseUid;

    if (
      !text ||
      sentiment === undefined ||
      sentimentScore === undefined ||
      !firebaseUid ||
      level === undefined
    ) {
      return res
        .status(400)
        .json({
          error: "Text, sentimentScore, and firebaseUid are required fields.",
        });
    }

    const savedEntry = await saveJournalEntry(
      text,
      sentiment,
      sentimentScore,
      level,
      firebaseUid
    );

    res.status(201).json(savedEntry);
  } catch (err) {
    console.error("Error saving journal entry:", err);
    next(err);
  }
};

exports.deleteJournalEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const firebaseUid = req.user?.firebaseUid;

    if (!id || !firebaseUid) {
      return res
        .status(400)
        .json({ error: "Entry ID and user authentication is required." });
    }

    const deletedEntry = await deleteJournalEntry(id, firebaseUid);
    res.json({ message: "Journal entry deleted successfully.", deletedEntry });
  } catch (err) {
    next(err);
  }
};
