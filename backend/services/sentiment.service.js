const vader = require('vader-sentiment');

exports.analyzeSentiment = async (text) => {
  const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  return intensity;
};
