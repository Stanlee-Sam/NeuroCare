exports.validateSentimentInput = (req, res, next) => {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required for sentiment analysis.' });
    }
    next();
  };
  