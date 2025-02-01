
exports.validateJournalEntry = (req, res, next) => {
    const { text, sentimentScore, userId } = req.body;
    if (!text || !sentimentScore || !userId) {
      return res.status(400).json({
        error: "Text, sentimentScore, and userId are required fields.",
      });
    }
    next();
  };
  