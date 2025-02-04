exports.validateJournalEntry = (req, res, next) => {
  console.log("Request Body:", req.body); 
  const { text, sentimentScore, level, userId } = req.body;
  if (!text || sentimentScore === undefined || !userId) {  
    return res.status(400).json({
      error: "Text, sentimentScore, and userId are required fields.",
    });
  }
  next();
};
