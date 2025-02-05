const { analyzeSentiment } = require("../services/sentiment.service");

exports.analyzeSentiment = async (req, res, next) => {
  try {
    const { text } = req.body;
    console.log("Text received for sentiment analysis:", text); 
    const sentiment = await analyzeSentiment(text);
    res.json(sentiment);
  } catch (err) {
    next(err);
  }
};
