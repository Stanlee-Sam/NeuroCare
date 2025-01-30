
exports.validateJournalEntry = (req, res, next) => {
    const { entry, sentimentScore, userId } = req.body;
    if (!entry || !sentimentScore || !userId) {
      return res.status(400).json({
        error: "Entry, sentimentScore, and userId are required fields.",
      });
    }
    next();
  };
  